import { Avatar, AvatarFallback } from "../ui/avatar"
import { useState } from "react"
import type { Team } from "~/types/teams"
import type { User, UserWithPositions } from "~/types/users"
import { CreateDialogForm } from "../create-dialog-form"
import { PrimaryButton } from "../primary-button"
import { Label } from "../ui/label"
import { UsersCombobox } from "./users-combobox"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { UsersAPI } from "~/api/users"
import { toast } from "sonner"
import { getInitials } from "~/lib/utils"


export const AddTeamMember = ({ team }: { team: Team }) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const queryClient = useQueryClient();

  const membersQuery = useQuery({
    queryKey: ['members'],
    queryFn: UsersAPI.getAllMembers,
  });

  const teamMembersQuery = useQuery({
    queryKey: ['team_members', team.id],
    queryFn: async () => {
      const data = await UsersAPI.getMembersWithinTeam(team.id);
      return data;
    },
  });

  const addTeamMembersMutation = useMutation({
    mutationFn: UsersAPI.addTeamMembers,
    onSuccess: () => {
      toast.success("Team member(s) added successfully!");
      queryClient.invalidateQueries({ queryKey: ['team_members', team.id] });
      queryClient.invalidateQueries({ queryKey: ['members'] });

      setSelectedUsers([]) // Clear selected state
    },
  });

  const handleAddTeamMembers = (data: User[]) => {
    const payload = {
      team_id: team.id,
      user_ids: data.map(user => user.id),
    };
    addTeamMembersMutation.mutate(payload);
  };

  // Compute members not in the team
  let membersNotInTeam: UserWithPositions[] = [];
  if (membersQuery.data && teamMembersQuery.data) {
    const teamMemberIds = new Set(teamMembersQuery.data.map((u: User) => u.id));
    membersNotInTeam = membersQuery.data.filter((u: User) => !teamMemberIds.has(u.id));
  } else if (membersQuery.data) {
    membersNotInTeam = membersQuery.data;
  }

  return (
    <CreateDialogForm<Partial<Team>>
      title={`Add new member to "${team.name}"`}
      description="Select multiple members to add in the team"
      defaultValues={{}}
      trigger={
        <button className="hover:cursor-pointer hover:underline">
          Add member
        </button>
      }
      onSubmit={async () => {
        handleAddTeamMembers(selectedUsers)
      }}
      submitButton={
        <PrimaryButton type="submit" form="dialog-form">
          Submit
        </PrimaryButton>
      }
      cancelLabel="Cancel"
    >
      {() => (
        <>
          <Label className="mb-2 mt-3 block">Select member(s)</Label>
          {membersQuery.isLoading || teamMembersQuery.isLoading ? (
            <div className="text-muted-foreground py-2">Loading members...</div>
          ) : membersQuery.error || teamMembersQuery.error ? (
            <div className="text-destructive py-2">Failed to load members.</div>
          ) : (
            <UsersCombobox
              userLists={membersNotInTeam}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          )}

          <Label className="mb-1 mt-8 block">Current Team Members</Label>
          {teamMembersQuery.isLoading ? (
            <div className="text-muted-foreground py-2">Loading current team members...</div>
          ) : teamMembersQuery.error ? (
            <div className="text-destructive py-2">Failed to load team members.</div>
          ) : !teamMembersQuery.data || teamMembersQuery.data.length === 0 ? (
            <div className="text-muted-foreground py-2">No members yet for this team.</div>
          ) : (
            <div className="flex flex-wrap gap-3 mt-2 mb-2">
              {teamMembersQuery.data.map((member: any) => (
                <div
                  key={member.id}
                  className="flex items-center gap-2 px-2 py-1 rounded border border-muted bg-muted/40"
                >
                  <Avatar className="h-7 w-7 text-sm">
                    <AvatarFallback>
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{member.name}</span>
                    <span className="text-xs text-muted-foreground">{member.username}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </>
      )}
    </CreateDialogForm>
  )
}