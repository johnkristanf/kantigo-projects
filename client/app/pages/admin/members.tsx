import { Plus, X } from "lucide-react";

import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateDialogForm } from "~/components/create-dialog-form";
import type { Team } from "~/types/teams";
import { PrimaryButton } from "~/components/primary-button";
import { TeamsAPI } from "~/api/teams";
import { DataTable } from "~/components/data-table";
import { teamColumns } from "~/components/teams/columns";
import { UsersAPI } from "~/api/users";
import { cn } from "~/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import type { CreateUser, User } from "~/types/users";

export default function MembersPage() {
  const queryClient = useQueryClient();

  const positionsQuery = useQuery({
    queryKey: ['positions'],
    queryFn: UsersAPI.getAllPositions,
  });

  const createMemberMutation = useMutation({
    mutationFn: UsersAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast.success("Team created successfully!")
    },
  })

  const handleCreateMember = (data: CreateUser) => {
    console.log("data submit: ", data);
    createMemberMutation.mutate(data);
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Members</h1>
        <p className="text-muted-foreground">
          Manage members for the teams within the company or organization.
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <CreateDialogForm<CreateUser>
          title="Create Member"
          description="Fill in member details."
          defaultValues={{
            name: "",
            username: "",
            password: "",
            positions: [],
          }}
          trigger={
            <PrimaryButton className="flex items-center justify-center p-2">
              <Plus className="size-5" />
              Add New Member
            </PrimaryButton>
          }
          onSubmit={async (data) => {
            handleCreateMember(data)
          }}
          submitButton={
            <PrimaryButton type="submit" form="dialog-form" className="flex items-center gap-1">
              Submit
            </PrimaryButton>
          }
          cancelLabel="Cancel"
        >
          {(form) => {
            const selectedPositions = form.watch("positions" as any) || [];
            
            const handlePositionToggle = (positionId: string) => {
              const currentPositions = form.getValues("positions" as any) || [];
              const newPositions = currentPositions.includes(positionId)
                ? currentPositions.filter((id: string) => id !== positionId)
                : [...currentPositions, positionId];
              form.setValue("positions" as any, newPositions);
            };

            const handleRemovePosition = (positionId: string) => {
              const currentPositions = form.getValues("positions" as any) || [];
              form.setValue("positions" as any, currentPositions.filter((id: string) => id !== positionId));
            };

            return (
              <>
                {/* Name Field */}
                <div className={cn("mb-4 w-full")}>
                  <Label htmlFor="name" className={cn("mb-2")}>Name</Label>
                  <Input
                    id="name"
                    {...form.register("name" as any, { 
                      required: "Name is required." 
                    })}
                    placeholder="Enter full name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-xs text-red-600 mt-1">
                      {form.formState.errors.name.message as string}
                    </p>
                  )}
                </div>

                {/* Username Field */}
                <div className={cn("mb-4 w-full")}>
                  <Label htmlFor="username" className={cn("mb-2")}>Username</Label>
                  <Input
                    id="username"
                    {...form.register("username" as any, { 
                      required: "Username is required.",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters"
                      }
                    })}
                    placeholder="Enter username"
                  />
                  {form.formState.errors.username && (
                    <p className="text-xs text-red-600 mt-1">
                      {form.formState.errors.username.message as string}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className={cn("mb-4 w-full")}>
                  <Label htmlFor="password" className={cn("mb-2")}>Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...form.register("password" as any, { 
                      required: "Password is required.",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    placeholder="Enter password"
                  />
                  {form.formState.errors.password && (
                    <p className="text-xs text-red-600 mt-1">
                      {form.formState.errors.password.message as string}
                    </p>
                  )}
                </div>

                {/* Positions Multi-Select */}
                <div className={cn("mb-4 w-full")}>
                  <Label htmlFor="positions" className={cn("mb-2")}>Positions</Label>
                  
                  {/* Selected Positions Display */}
                  {selectedPositions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2 p-2 border rounded-md bg-slate-50">
                      {selectedPositions.map((posId: string) => {
                        const position = positionsQuery.data?.find(p => p.id.toString() === posId);
                        return position ? (
                          <Badge key={posId} variant="secondary" className="flex items-center gap-1">
                            {position.name}
                            <X 
                              className="w-3 h-3 cursor-pointer hover:text-red-600" 
                              onClick={() => handleRemovePosition(posId)}
                            />
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  )}

                  {/* Multi-Select Dropdown */}
                  <Select
                    onValueChange={(val) => handlePositionToggle(val)}
                    value="" // Keep empty to allow re-selection
                    disabled={positionsQuery.isLoading}
                  >
                    <SelectTrigger id="positions" className={cn("w-full")}>
                      <SelectValue placeholder={
                        positionsQuery.isLoading 
                          ? "Loading positions..." 
                          : selectedPositions.length > 0 
                            ? `${selectedPositions.length} position(s) selected`
                            : "Select positions"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {positionsQuery.isLoading ? (
                        <div className="p-2 text-center text-gray-500 text-sm">Loading...</div>
                      ) : (
                        (positionsQuery.data ?? []).map(position => (
                          <SelectItem 
                            key={position.id} 
                            value={position.id.toString()}
                            className={cn(
                              selectedPositions.includes(position.id.toString()) && "bg-blue-50"
                            )}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span>{position.name}</span>
                              {selectedPositions.includes(position.id.toString()) && (
                                <span className="ml-2 text-blue-600">✓</span>
                              )}
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </>
            );
          }}
        </CreateDialogForm>
      </div>
    </section>
  );
}