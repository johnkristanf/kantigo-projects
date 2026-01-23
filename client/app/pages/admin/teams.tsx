import { Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { useForm } from "react-hook-form";
import {
  defaultProjectFormValues,
  type Project,
} from "~/types/projects";
import { ProjectCard } from "~/components/project-card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProjectsAPI } from "~/api/projects";
import { toast } from "sonner";
import { CreateDialogForm } from "~/components/create-dialog-form";
import type { Team } from "~/types/teams";
import { PrimaryButton } from "~/components/primary-button";
import { TeamsAPI } from "~/api/teams";
import { DataTable } from "~/components/data-table";
import { teamColumns } from "~/components/teams/columns";


export default function TeamsPage() {
  const queryClient = useQueryClient();

    const { data: teams, isLoading, error } = useQuery({
      queryKey: ['teams'],
      queryFn: TeamsAPI.getAll,
    });

    const createTeamMutation = useMutation({
      mutationFn: TeamsAPI.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
        toast.success("Team created successfully!")
      },
    })


  const handleCreateTeam = (data: Partial<Team>) => {
    console.log("data submit: ", data);
    createTeamMutation.mutate(data);
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Teams</h1>
        <p className="text-muted-foreground">
          Manage all teams within your company or organization.
        </p>
      </div>

      <div className="flex justify-end mb-4">


      <CreateDialogForm<Partial<Team>>
                        title="Create Team"
                        description="Fill in team details."
                        defaultValues={{
                          name: "",
                          description: "",
                        }}
                        trigger={
                          <PrimaryButton className="flex items-center justify-center p-2">
                            <Plus className="size-5" />
                            Add New Team
                          </PrimaryButton>
                        }
                        onSubmit={async (data) => {
                            handleCreateTeam(data)
                        }}
                        submitButton={
                          <PrimaryButton type="submit" form="dialog-form" className="flex items-center gap-1">
                            Submit
                          </PrimaryButton>
                        }
                        cancelLabel="Cancel"
                      >
                        {(form) => (
                          <>
                            <div>
                                <Label htmlFor="name" className="mb-2">
                                Name
                                </Label>
                                <Input
                                id="name"
                                {...form.register("name", {
                                    required: "Project name is required.",
                                })}
                                placeholder="Team name"
                                autoFocus
                                />
                                {form.formState.errors.name && (
                                <p className="text-xs text-red-600 mt-1">
                                    {form.formState.errors.name.message}
                                </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="description" className="mb-2">
                                Description
                                </Label>
                                <Textarea
                                id="description"
                                {...form.register("description")}
                                placeholder="A short team description"
                                data-testid="team-description"
                                />
                            </div>
                          </>
                        )}
                      </CreateDialogForm>
                      </div>

                      {error ? (
                        <div className="flex items-center justify-center py-8">
                          <span className="text-red-600">Error loading teams, please try again.</span>
                        </div>
                      ) : teams ? (
                        <DataTable data={teams} columns={teamColumns} />
                      ) : (
                        <div className="flex items-center justify-center py-8">
                          <span className="text-muted-foreground">Loading teams...</span>
                        </div>
                      )}

    </section>
  );
}
