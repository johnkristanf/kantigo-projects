import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTrigger,
} from "~/components/ui/dialog";
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


export default function ProjectsPage() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState } =
    useForm<Partial<Project>>({
      defaultValues: defaultProjectFormValues,
    });

    const { data: projects, isLoading, error } = useQuery({
      queryKey: ['projects'],
      queryFn: ProjectsAPI.getAll,
    });

    const createProjectMutation = useMutation({
      mutationFn: ProjectsAPI.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        toast.success("Project created successfully!")
        reset();
        setOpen(false);
      },
    })


  const onSubmit = (data: Partial<Project>) => {
    console.log("data submit: ", data);
    createProjectMutation.mutate(data);
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-muted-foreground">
          Manage all projects in your workspace.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects && projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        
        {/* Dashed new project container with modal trigger */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className="flex flex-col items-center justify-center border-2 border-dashed border-blue-500 rounded-lg p-6 h-full min-h-[160px] hover:bg-primary/5 transition-colors focus:outline-none"
              aria-label="Add new project"
            >
              <Plus className="w-8 h-8 mb-2 text-blue-500" />
              <span className="font-medium text-blue-500">Add New Project</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Enter project details to create a new project.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              id="create-project-form"
            >
              <div>
                <Label htmlFor="name" className="mb-2">
                  Project Name
                </Label>
                <Input
                  id="name"
                  {...register("name", {
                    required: "Project name is required.",
                  })}
                  placeholder="Project name"
                  autoFocus
                  data-testid="project-name"
                />
                {formState.errors.name && (
                  <p className="text-xs text-red-600 mt-1">
                    {formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="description" className="mb-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="A short project description"
                  data-testid="project-description"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="start_date" className="mb-2">
                    Start Date
                  </Label>
                  <Input
                    id="start_date"
                    type="date"
                    {...register("start_date", {
                      required: "Start date required",
                    })}
                  />
                  {formState.errors.start_date && (
                    <p className="text-xs text-red-600 mt-1">
                      {formState.errors.start_date.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <Label htmlFor="end_date" className="mb-2">
                    End Date
                  </Label>
                  <Input
                    id="end_date"
                    type="date"
                    {...register("end_date", { required: "End date required" })}
                  />
                  {formState.errors.end_date && (
                    <p className="text-xs text-red-600 mt-1">
                      {formState.errors.end_date.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                form="create-project-form"
                disabled={formState.isSubmitting}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
