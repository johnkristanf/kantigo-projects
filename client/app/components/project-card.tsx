import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { formatDate, getInitials } from "~/lib/utils";
import type { Project } from "~/types/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 bg-blue-100 text-blue-700">
            <AvatarFallback className="font-bold">
              {getInitials(project.name)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">{project.name}</CardTitle>
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
          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
            project.status === "COMPLETED"
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
