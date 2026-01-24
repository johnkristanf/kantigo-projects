import { useState } from "react"
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
  } from "~/components/ui/combobox"
import type { Team } from "~/types/teams"
import type { User } from "~/types/users"
import { CreateDialogForm } from "../create-dialog-form"
import { PrimaryButton } from "../primary-button"
import { Plus } from "lucide-react"
import { Label } from "../ui/label"

export const AddTeamMember = ({ team }: { team: Team }) => {
    const anchor = useComboboxAnchor()
  
    const testUsers: User[] = [
      {
        id: 1,
        name: "Alice Example",
        username: "alice",
        created_at: "2023-09-10T08:34:01.555Z",
        updated_at: "2023-10-12T10:22:01.123Z",
      },
      {
        id: 2,
        name: "Bob Sample",
        username: "bob",
        created_at: "2023-07-02T13:15:21.555Z",
        updated_at: "2023-08-05T18:33:01.321Z",
      },
    ]
  
    const [selectedUsers, setSelectedUsers] = useState<User[]>()

    return (
      <CreateDialogForm<Partial<Team>>
        title={`Add New Member to "${team.name}"`}
        description="Select existing members to the team"
        defaultValues={{}}
        trigger={
          <PrimaryButton className="flex items-center justify-center p-2">
            <Plus className="size-5" />
            Add new member
          </PrimaryButton>
        }
        onSubmit={async () => {
          console.log("selectedUsers: ", selectedUsers)
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
            <Label className="mb-2 block">Add Member</Label>
  
            <Combobox
                multiple
                items={testUsers}
                value={selectedUsers ?? []}
                onValueChange={(newValue) => {
                    console.log("onValueChange called with:", newValue)
                    setSelectedUsers(newValue)
                }}
                itemToStringValue={(user) => user.name}
                >
                <ComboboxChips ref={anchor} className="w-full max-w-xs">
                    {selectedUsers?.map((user) => (
                    <ComboboxChip key={user.id}>
                        {user.name}
                    </ComboboxChip>
                    ))}
                    <ComboboxChipsInput placeholder="Search users..." />
                </ComboboxChips>

                <ComboboxContent anchor={anchor}>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                    {(user: User) => (
                        <ComboboxItem key={user.id} value={user}>
                        {user.name}
                        </ComboboxItem>
                    )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
          </>
        )}
      </CreateDialogForm>
    )
  }
  