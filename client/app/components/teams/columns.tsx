import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "~/lib/utils";
import type { Team } from "~/types/teams";
import { AddTeamMember } from "./add-team-member";


export const teamColumns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "created_at",
    header: "Date Created",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.original.created_at);
      return formattedDate;
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">

          <AddTeamMember team={row.original} />

          <button
            onClick={() => {
              // Placeholder for edit logic
              alert(`Edit team ${row.original.name}`);
            }}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => {
              // Placeholder for delete logic
              alert(`Delete team ${row.original.name}`);
            }}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>

      )
    },
  },
];
