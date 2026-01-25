import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { formatDate, getInitials } from "~/lib/utils";
import type { Project } from "~/types/projects";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Ellipsis } from "lucide-react";
import { CreateDialogForm } from "./create-dialog-form";
import { PrimaryButton } from "./primary-button";
import { Label } from "./ui/label";
import { TeamsAPI } from "~/api/teams";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MultiSelectCombobox } from "./multi-combobox";
import type { Team } from "~/types/teams";
import { ProjectsAPI } from "~/api/projects";
import { toast } from "sonner";

export function ProjectCard({ project }: { project: Project }) {
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const queryClient = useQueryClient();

  const teamsQuery = useQuery({
    queryKey: ['teams'],
    queryFn: TeamsAPI.getAll,
  });

  const teamsComboBoxOption = (teamsQuery?.data ?? []).map(u => ({
    ...u,
    id: u.id,
    label: u.name
  }));


  const assignTeamsMutation = useMutation({
    mutationFn: ProjectsAPI.assignTeams,
    onSuccess: () => {
      toast.success("Teams successfully assigned to the project!");
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  // Handle submission of assigning teams to a project
  const handleAssignTeams = async (data: Team[]) => {
    const payload = {
      projectId: project.id,
      teamIds: data.map(team => team.id),
    }

    assignTeamsMutation.mutate(payload);
    setSelectedTeams([]); // Clear selection after submission
  };

  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow relative">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 bg-blue-100 text-blue-700">
            <AvatarFallback className="font-bold">
              {getInitials(project.name)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">{project.name}</CardTitle>
        </div>
        {/* Ellipsis Dropdown top right corner absolute */}
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-muted-foreground focus:outline-none"
                aria-label="Project actions"
              >
                <Ellipsis className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                {/* Use a span (not button) for trigger! */}
                <CreateDialogForm<Partial<Project>>
                  title={`Add new team to "${project.name}"`}
                  description="Select multiple members to add in the team"
                  defaultValues={{}}
                  trigger={
                    <span
                      className="text-sm hover:cursor-pointer hover:underline block ml-2"
                    >
                      Add Teams
                    </span>
                  }
                  onSubmit={async () => {
                    console.log("selectedTeams: ", selectedTeams);
                    handleAssignTeams(selectedTeams)
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
                      <Label className="mb-2 mt-3 block">Select team(s)</Label>
                      {teamsQuery.isLoading ? (
                        <div className="text-muted-foreground py-2">Loading members...</div>
                      ) : teamsQuery.error ? (
                        <div className="text-destructive py-2">Failed to load members.</div>
                      ) : (
                        <MultiSelectCombobox
                          options={teamsComboBoxOption}
                          selected={selectedTeams}
                          setSelected={setSelectedTeams}
                          renderSelectedLabel={team => team.name}
                          renderOptionLabel={team => team.name}
                          placeholder={''}
                          searchPlaceholder={"Search teams..."}
                        />
                      )}

                      <Label className="mb-1 mt-8 block">Current Assigned Team</Label>
                      {/* ...Team members section omitted for brevity... */}
                    </>
                  )}
                </CreateDialogForm>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-blue-500" onSelect={() => {/* Edit logic */ }}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onSelect={() => {/* Delete logic */ }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-sm mb-2">
          {project.description}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span>
            <strong className="text-blue-500">Start:</strong>{" "}
            {formatDate(project.start_date)}
          </span>
          <span>–</span>
          <span>
            <strong className="text-blue-500">End:</strong>{" "}
            {formatDate(project.end_date)}
          </span>
        </div>
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${project.status === "COMPLETED"
            ? "bg-green-100 text-green-800"
            : project.status === "IN_PROGRESS"
              ? "bg-yellow-100 text-blue-800"
              : "bg-gray-100 text-yellow-800"
            }`}
        >
          {project.status.replace("_", " ").toUpperCase()}
        </span>
      </CardContent>
    </Card>
  );
}
