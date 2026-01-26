import React, { useState } from 'react';
import { ChevronDown, User, Calendar, Plus, ClipboardList } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';


import { PrimaryButton } from '~/components/primary-button';
import { CreateDialogForm } from '~/components/create-dialog-form';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { TaskStatus, type Task } from '~/types/projects';
import {  cn,  getStatusStyle } from '~/lib/utils';
import { TaskCards } from '~/components/task-cards';
import { NavBar } from '~/components/navbar';
import { ProjectOverviewCard } from '~/components/project-overview-card';
import { useQuery } from '@tanstack/react-query';
import { TasksAPI } from '~/api/tasks';
import { ProjectsAPI } from '~/api/projects';

export default function ProjectsDashboardPage() {
  const [selectedProject, setSelectedProject] = useState('website-redesign');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const userID = 1;

  const teamMembersQuery = useQuery({
    queryKey: ['projects_per_user', userID],
    queryFn: async () => {
      const data = await ProjectsAPI.getProjectsUnderUser(userID);
      console.log("data getProjectsUnderUser: ", data);
      
      return data;
    },
  });

  const projects = [
    { id: 'website-redesign', name: 'Website Redesign', completed: 41, total: 50 },
    { id: 'mobile-app', name: 'Mobile App Development', completed: 28, total: 45 },
    { id: 'marketing-campaign', name: 'Marketing Campaign', completed: 15, total: 20 },
  ];

  const tasks = [
    { id: 1, name: 'Design homepage mockup', status: 'Completed', assignee: 'Sarah Johnson', priority: 'High', weight: 'Heavy', start_date: '2026-01-10', end_date: '2026-01-15' },
    { id: 2, name: 'Implement navigation menu', status: 'In Progress', assignee: 'Mike Chen', priority: 'High', weight: 'Medium', start_date: '2026-01-16', end_date: '2026-01-22' },
    { id: 3, name: 'Create contact form', status: 'In Progress', assignee: 'Emily Davis', priority: 'Medium', weight: 'Light', start_date: '2026-01-20', end_date: '2026-01-25' },
    { id: 4, name: 'Optimize images', status: 'Pending', assignee: 'Alex Kumar', priority: 'Low', weight: 'Light', start_date: '2026-01-24', end_date: '2026-01-28' },
    { id: 5, name: 'Write documentation', status: 'Pending', assignee: 'Sarah Johnson', priority: 'Medium', weight: 'Medium', start_date: '2026-01-28', end_date: '2026-02-01' },
    { id: 6, name: 'Setup deployment pipeline', status: 'Completed', assignee: 'Mike Chen', priority: 'High', weight: 'Heavy', start_date: '2026-01-12', end_date: '2026-01-18' },
    { id: 7, name: 'Conduct user testing', status: 'Pending', assignee: 'Emily Davis', priority: 'High', weight: 'Medium', start_date: '2026-02-01', end_date: '2026-02-05' },
    { id: 8, name: 'Fix responsive issues', status: 'In Progress', assignee: 'Alex Kumar', priority: 'Medium', weight: 'Light', start_date: '2026-01-26', end_date: '2026-01-30' },
  ];

  const currentProject = projects.find(p => p.id === selectedProject);

  // Get unique assignees for filter
  const uniqueAssignees = [...new Set(tasks.map(task => task.assignee))];

  // Group tasks by status
  const tasksByStatus = {
    'To Do': tasks.filter(task => task.status === 'Pending'),
    'In Progress': tasks.filter(task => task.status === 'In Progress'),
    'Completed': tasks.filter(task => task.status === 'Completed'),
  };

  const weightsQuery = useQuery({
    queryKey: ['weights'],
    queryFn: TasksAPI.getAllWeights,
  });

  const prioritiesQuery = useQuery({
    queryKey: ['priorities'],
    queryFn: TasksAPI.getAllPriorities,
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <NavBar />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100">
          {/* Project Selector */}
          <div className="flex justify-end p-6 pb-0">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-72 border-2 border-blue-200 hover:border-blue-400 transition-colors bg-white shadow-sm">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ProjectOverviewCard selectedProject={currentProject} />

          {/* Kanban Board */}
          <div className="m-6 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(tasksByStatus).map(([status, tasks]) => (
                <div key={status} className={`rounded-xl border-2 bg-gray-100 p-4`}>
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold text-lg ${getStatusStyle(status)}`}>{status}</h3>
                      <span className="bg-white px-2 py-0.5 rounded-full text-xs font-semibold text-slate-600">
                        {tasks.length}
                      </span>
                    </div>

                    {status === TaskStatus.TODO && (
                      <CreateDialogForm<Partial<Task>>
                        title="Create Task"
                        description="Fill in task details."
                        defaultValues={{
                          name: "",
                        }}
                        trigger={
                          <PrimaryButton className="flex items-center justify-center p-2">
                            <Plus className="size-5" />
                          </PrimaryButton>
                        }
                        onSubmit={async (data) => {
                          alert(`Submitted! Name: ${data.name}`);
                        }}
                        submitButton={
                          <PrimaryButton type="submit" className="flex items-center gap-1">
                            Submit
                          </PrimaryButton>
                        }
                        cancelLabel="Cancel"
                      >
                        {(form) => (
                          <>
                            <div className={cn("mb-4")}>
                              <Label htmlFor="name" className={cn("mb-2")}>Name</Label>
                              <Input
                                id="name"
                                {...form.register("name", { required: "Task name is required." })}
                                placeholder="Name"
                                className={cn()}
                              />
                              {form.formState.errors.name && (
                                <p className={cn("text-xs text-red-600 mt-1")}>{form.formState.errors.name.message as string}</p>
                              )}
                            </div>

                            {/* PRIORITY */}
                            <div className={cn("mb-4 w-full")}>
                              <Label htmlFor="priority" className={cn("mb-2")}>Priority</Label>
                              <Select
                                onValueChange={val => form.setValue("priority" as any, val)}
                                value={form.watch("priority" as any) || ""}
                                disabled={prioritiesQuery.isLoading}
                              >
                                <SelectTrigger id="priority" className={cn("w-full")}>
                                  <SelectValue placeholder={prioritiesQuery.isLoading ? "Loading priorities..." : "Select priority"} />
                                </SelectTrigger>
                                <SelectContent>
                                  {prioritiesQuery.isLoading ? (
                                    <div className="p-2 text-center text-gray-500 text-sm">Loading...</div>
                                  ) : (
                                    (prioritiesQuery.data ?? []).map(priority => (
                                      <SelectItem key={priority.id} value={priority.id.toString()}>
                                        {priority.name}
                                      </SelectItem>
                                    ))
                                  )}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* WEIGHTS */}
                            <div className={cn("mb-4 w-full")}>
                              <Label htmlFor="weight" className={cn("mb-2")}>Weight</Label>
                              <Select
                                onValueChange={val => form.setValue("weight" as any, val)}
                                value={form.watch("weight" as any) || ""}
                                disabled={weightsQuery.isLoading}
                              >
                                <SelectTrigger id="weight" className={cn("w-full")}>
                                  <SelectValue placeholder={weightsQuery.isLoading ? "Loading weights..." : "Select weight"} />
                                </SelectTrigger>
                                <SelectContent>
                                  {weightsQuery.isLoading ? (
                                    <div className="p-2 text-center text-gray-500 text-sm">Loading...</div>
                                  ) : (
                                    (weightsQuery.data ?? []).map(weight => (
                                      <SelectItem key={weight.id} value={weight.id.toString()}>
                                        {weight.name}
                                      </SelectItem>
                                    ))
                                  )}
                                </SelectContent>
                              </Select>
                              {form.formState.errors && (form.formState.errors as any).weight && (
                                <p className={cn("text-xs text-red-600 mt-1")}>{(form.formState.errors as any).weight.message as string}</p>
                              )}
                            </div>
                            <div className={cn("mb-4 w-full")}>
                              <Label htmlFor="assignee" className={cn("mb-2")}>Assignee</Label>
                              <Select
                                onValueChange={val => form.setValue("assignee" as any, val)}
                                value={form.watch("assignee" as any) || ""}
                              >
                                <SelectTrigger id="assignee" className={cn("w-full")}>
                                  <SelectValue placeholder="Select assignee" />
                                </SelectTrigger>
                                <SelectContent>
                                  {uniqueAssignees.map(assignee => (
                                    <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {form.formState.errors && (form.formState.errors as any).assignee && (
                                <p className={cn("text-xs text-red-600 mt-1")}>{(form.formState.errors as any).assignee.message as string}</p>
                              )}
                            </div>
                            <div className={cn("mb-4 w-full")}>
                              <Label htmlFor="startDate" className={cn("mb-2")}>Start Date</Label>
                              <Input
                                id="startDate"
                                type="date"
                                {...form.register("start_date", { required: "Start date is required." })}
                                className={cn()}
                              />
                              {form.formState.errors && (form.formState.errors as any).startDate && (
                                <p className={cn("text-xs text-red-600 mt-1")}>{(form.formState.errors as any).startDate.message as string}</p>
                              )}
                            </div>
                            <div className={cn("mb-4 w-full")}>
                              <Label htmlFor="endDate" className={cn("mb-2")}>End Date</Label>
                              <Input
                                id="endDate"
                                type="date"
                                {...form.register("end_date", { required: "End date is required." })}
                                className={cn()}
                              />
                              {form.formState.errors && (form.formState.errors as any).endDate && (
                                <p className={cn("text-xs text-red-600 mt-1")}>{(form.formState.errors as any).endDate.message as string}</p>
                              )}
                            </div>
                          </>
                        )}
                      </CreateDialogForm>
                    )}
                  </div>
                  <TaskCards status={status} tasks={tasks} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}