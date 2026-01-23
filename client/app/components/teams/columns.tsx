import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "~/lib/utils";
import type { Team } from "~/types/teams";

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
      // You can flesh out more functionality as needed
      return (
        <div className="flex gap-2">
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
      );
    },
  },
];
