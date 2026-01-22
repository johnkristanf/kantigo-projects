import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getInitials(name: string): string {
  const words = name.split(" ").filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return words[0][0].toUpperCase() + words[1][0].toUpperCase();
}


export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'text-rose-700 bg-rose-50 border-rose-200';
    case 'Medium':
      return 'text-amber-700 bg-amber-50 border-amber-200';
    case 'Low':
      return 'text-teal-700 bg-teal-50 border-teal-200';
    default:
      return 'text-slate-700 bg-slate-50 border-slate-200';
  }
};

export const getWeightColor = (weight: string) => {
  switch (weight) {
    case 'Heavy':
      return 'text-purple-700 bg-purple-50 border-purple-200';
    case 'Medium':
      return 'text-indigo-700 bg-indigo-50 border-indigo-200';
    case 'Light':
      return 'text-cyan-700 bg-cyan-50 border-cyan-200';
    default:
      return 'text-slate-700 bg-slate-50 border-slate-200';
  }
};

export const getStatusStyle = (status: string) => {
  switch (status) {
    case 'To Do':
      return 'text-yellow-600';
    case 'In Progress':
      return 'text-blue-600';
    case 'Completed':
      return 'text-green-600';
    default:
      return 'bg-slate-100 border-slate-300';
  }
};
