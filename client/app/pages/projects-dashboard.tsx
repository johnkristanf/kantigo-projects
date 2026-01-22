import React, { useState } from "react";
import { ChevronDown, User, Calendar, ClipboardList } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { CreateDialogForm } from "~/components/create-dialog-form";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { PrimaryButton } from "~/components/primary-button";

export default function ProjectsDashboardPage() {
  const [selectedProject, setSelectedProject] = useState("website-redesign");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterAssignee, setFilterAssignee] = useState("all");

  const projects = [
    {
      id: "website-redesign",
      name: "Website Redesign",
      completed: 41,
      total: 50,
    },
    {
      id: "mobile-app",
      name: "Mobile App Development",
      completed: 28,
      total: 45,
    },
    {
      id: "marketing-campaign",
      name: "Marketing Campaign",
      completed: 15,
      total: 20,
    },
  ];

  const tasks = [
    {
      id: 1,
      name: "Design homepage mockup",
      status: "Completed",
      assignee: "Sarah Johnson",
      priority: "High",
      weight: "Heavy",
      startDate: "2026-01-10",
      endDate: "2026-01-15",
    },
    {
      id: 2,
      name: "Implement navigation menu",
      status: "In Progress",
      assignee: "Mike Chen",
      priority: "High",
      weight: "Medium",
      startDate: "2026-01-16",
      endDate: "2026-01-22",
    },
    {
      id: 3,
      name: "Create contact form",
      status: "In Progress",
      assignee: "Emily Davis",
      priority: "Medium",
      weight: "Light",
      startDate: "2026-01-20",
      endDate: "2026-01-25",
    },
    {
      id: 4,
      name: "Optimize images",
      status: "Pending",
      assignee: "Alex Kumar",
      priority: "Low",
      weight: "Light",
      startDate: "2026-01-24",
      endDate: "2026-01-28",
    },
    {
      id: 5,
      name: "Write documentation",
      status: "Pending",
      assignee: "Sarah Johnson",
      priority: "Medium",
      weight: "Medium",
      startDate: "2026-01-28",
      endDate: "2026-02-01",
    },
    {
      id: 6,
      name: "Setup deployment pipeline",
      status: "Completed",
      assignee: "Mike Chen",
      priority: "High",
      weight: "Heavy",
      startDate: "2026-01-12",
      endDate: "2026-01-18",
    },
    {
      id: 7,
      name: "Conduct user testing",
      status: "Pending",
      assignee: "Emily Davis",
      priority: "High",
      weight: "Medium",
      startDate: "2026-02-01",
      endDate: "2026-02-05",
    },
    {
      id: 8,
      name: "Fix responsive issues",
      status: "In Progress",
      assignee: "Alex Kumar",
      priority: "Medium",
      weight: "Light",
      startDate: "2026-01-26",
      endDate: "2026-01-30",
    },
  ];

  const currentProject = projects.find((p) => p.id === selectedProject);
  const progressPercentage = currentProject
    ? (currentProject.completed / currentProject.total) * 100
    : 0;

  // Get unique assignees for filter
  const uniqueAssignees = [...new Set(tasks.map((task) => task.assignee))];

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filterStatus === "all" || task.status === filterStatus;
    const assigneeMatch =
      filterAssignee === "all" || task.assignee === filterAssignee;
    return statusMatch && assigneeMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-emerald-700 bg-emerald-50 border border-emerald-200";
      case "In Progress":
        return "text-blue-700 bg-blue-50 border border-blue-200";
      case "Pending":
        return "text-slate-700 bg-slate-50 border border-slate-200";
      default:
        return "text-slate-700 bg-slate-50 border border-slate-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-rose-700 bg-rose-50 border border-rose-200";
      case "Medium":
        return "text-amber-700 bg-amber-50 border border-amber-200";
      case "Low":
        return "text-teal-700 bg-teal-50 border border-teal-200";
      default:
        return "text-slate-700 bg-slate-50 border border-slate-200";
    }
  };

  const getWeightColor = (weight: string) => {
    switch (weight) {
      case "Heavy":
        return "text-purple-700 bg-purple-50 border border-purple-200";
      case "Medium":
        return "text-indigo-700 bg-indigo-50 border border-indigo-200";
      case "Light":
        return "text-cyan-700 bg-cyan-50 border border-cyan-200";
      default:
        return "text-slate-700 bg-slate-50 border border-slate-200";
    }
  };

  type ExampleFormFields = {
    name: string;
    description: string;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100">
      {/* Navbar */}
      <nav className="bg-linear-to-r from-blue-700 via-blue-500 to-cyan-500 text-white px-6 py-4 shadow-xl backdrop-blur-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Avatar className="w-12 h-12 ">
              <AvatarImage src="/kantigo_logo.png" />
              <AvatarFallback className="bg-white text-blue-700 text-xl font-bold">
                KantiGo Logo
              </AvatarFallback>
            </Avatar>

            <h1 className="text-2xl font-bold tracking-tight">
              KantiGo Projects
            </h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-white/20 px-4 py-2 rounded-xl transition-all focus:outline-none backdrop-blur-sm">
              <div className="w-9 h-9 bg-linear-to-br from-white to-blue-100 rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-blue-700" />
              </div>
              <span className="font-semibold">John Doe</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

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
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Project Overview Card */}
          <div className="m-6 bg-linear-to-br from-blue-500 via-cyan-400 to-indigo-500 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl -ml-24 -mb-24"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="w-16 h-16 ">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentProject?.name || ""}`} />
                  <AvatarFallback className="bg-white text-blue-700 text-xl font-bold">
                    {currentProject?.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-4xl font-bold tracking-tight">
                  {currentProject?.name}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100 text-lg font-medium">
                    Task Progress
                  </span>
                  <span className="text-3xl font-bold">
                    {currentProject?.completed} / {currentProject?.total} tasks
                  </span>
                </div>
                <div className="bg-white/20 rounded-full p-1 backdrop-blur-sm shadow-inner">
                  <div className="h-4 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-blue-50 text-base font-medium">
                  {progressPercentage.toFixed(1)}% complete
                </p>
              </div>
            </div>
          </div>

          {/* Tasks Table */}
          <div className="m-6 border-2 border-blue-100 rounded-xl overflow-hidden shadow-lg bg-white">
            {/* Filter Section */}
            <div className="bg-linear-to-r from-cyan-50 to-blue-100 p-4 border-b-2 border-blue-100">
              <div className="flex items-center gap-4">
                <div className="w-full flex justify-end">
                  <div className="flex items-center gap-2">
                    {/* Status Filter */}
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-48 bg-white border-blue-200 hover:border-blue-400 transition-colors shadow-sm">
                        <SelectValue placeholder="Filter by Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Assignee Filter */}
                    <Select
                      value={filterAssignee}
                      onValueChange={setFilterAssignee}
                    >
                      <SelectTrigger className="w-48 bg-white border-blue-200 hover:border-blue-400 transition-colors shadow-sm">
                        <SelectValue placeholder="Filter by Assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Assignees</SelectItem>
                        {uniqueAssignees.map((assignee) => (
                          <SelectItem key={assignee} value={assignee}>
                            {assignee}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <CreateDialogForm<ExampleFormFields>
                      title="Create Project"
                      description="Fill in project details."
                      defaultValues={{
                        name: "",
                        description: "",
                      }}
                      trigger={
                        <PrimaryButton className="flex items-center gap-1">
                          <ClipboardList className="size-5" /> 
                          Add Tasks
                        </PrimaryButton>
                      }
                      onSubmit={async (data) => {
                        alert(`Submitted! Name: ${data.name}, Desc: ${data.description}`);
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
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(filterStatus !== "all" || filterAssignee !== "all") && (
                  <button
                    onClick={() => {
                      setFilterStatus("all");
                      setFilterAssignee("all");
                    }}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-blue-100 to-indigo-50 border-b-2 border-blue-200">
                    <th className="text-left py-5 px-6 font-bold text-blue-900 text-sm uppercase tracking-wider">
                      Task Name
                    </th>
                    <th className="text-left py-5 px-6 font-bold text-blue-900 text-sm uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-5 px-6 font-bold text-blue-900 text-sm uppercase tracking-wider">
                      Assignee
                    </th>
                    <th className="text-left py-5 px-6 font-bold text-blue-900 text-sm uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="text-left py-5 px-6 font-bold text-blue-900 text-sm uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="text-left py-5 px-6 font-bold text-blue-900 text-sm uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="text-left py-5 px-6 font-bold text-blue-900 text-sm uppercase tracking-wider">
                      End Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task, index) => (
                    <tr
                      key={task.id}
                      className={`border-b border-blue-50 hover:bg-linear-to-r hover:from-blue-50/60 hover:to-cyan-50/30 transition-all ${
                        index % 2 === 0 ? "bg-white" : "bg-blue-50/30"
                      }`}
                    >
                      <td className="py-5 px-6 font-semibold text-slate-800">
                        {task.name}
                      </td>
                      <td className="py-5 px-6">
                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusColor(task.status)}`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-slate-700 font-medium">
                        {task.assignee}
                      </td>
                      <td className="py-5 px-6">
                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${getWeightColor(task.weight)}`}
                        >
                          {task.weight}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-sm">
                            {task.startDate}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          <span className="font-medium text-sm">
                            {task.endDate}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
