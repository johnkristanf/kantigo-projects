import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useForm, type UseFormReturn, type FieldValues } from "react-hook-form";

interface CreateDialogFormProps<T extends FieldValues> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  trigger?: React.ReactNode;
  defaultValues: T;
  children: (form: UseFormReturn<T>) => React.ReactNode;
  onSubmit: (data: T) => void | Promise<void>;
  submitButton?: React.ReactNode;
  cancelLabel?: string;
  isSubmitting?: boolean;
}

export function CreateDialogForm<T extends FieldValues>({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  defaultValues,
  children,
  onSubmit,
  submitButton,
  cancelLabel = "Cancel",
  isSubmitting,
}: CreateDialogFormProps<T>) {
  const [internalOpen, setInternalOpen] = useState(false);
  const form = useForm<T>({ defaultValues });

  const handleSubmit = form.handleSubmit(async (data) => {    
    await onSubmit(data);
    setInternalOpen(false);
    onOpenChange?.(false);
  });

  // Use external open control if provided, else fallback to internal state
  const dialogOpen = typeof open === "boolean" ? open : internalOpen;
  const setDialogOpen = onOpenChange ? onOpenChange : setInternalOpen;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            {title}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5" id="dialog-form">
          {children(form)}
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {cancelLabel}
            </Button>
          </DialogClose>
          {submitButton ? submitButton : (
            <Button
              type="submit"
              form="dialog-form"
              disabled={isSubmitting ?? form.formState.isSubmitting}
            >
              Create
            </Button>
        )}
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** --- Sample Usage --- */
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type ExampleFormFields = {
  name: string;
  description: string;
};

export function SampleCreateProjectDialog() {
  return (
    <CreateDialogForm<ExampleFormFields>
      title="Create Project"
      description="Fill in project details."
      defaultValues={{
        name: "",
        description: "",
      }}
      onSubmit={async (data) => {
        // Replace with actual create logic
        alert(`Submitted! Name: ${data.name}, Desc: ${data.description}`);
      }}
      trigger={
        <Button className="bg-blue-500 text-white">New Project</Button>
      }
      submitLabel="Create"
      cancelLabel="Cancel"
    >
      {(form) => (
        <>
          <div>
            <Label htmlFor="name" className="mb-2">Project Name</Label>
            <Input
              id="name"
              {...form.register("name", { required: "Project name is required." })}
              placeholder="Project name"
            />
            {form.formState.errors.name && (
              <p className="text-xs text-red-600 mt-1">{form.formState.errors.name.message as string}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description" className="mb-2">Description</Label>
            <Input
              id="description"
              {...form.register("description")}
              placeholder="Project description"
            />
          </div>
        </>
      )}
    </CreateDialogForm>
  );
}