import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "~/lib/utils";
import type { Team } from "~/types/teams";
import type {  UserWithRolesPositions } from "~/types/users";

export const memberColumns: ColumnDef<UserWithRolesPositions>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },

  {
    accessorKey: "positions",
    header: "Positions",
    cell: ({ row }) => {
      const positions = row.original.positions || [];
      return (
        <div className="flex flex-wrap gap-1">
          {positions.length > 0
            ? positions.map((position) => (
                <span
                  key={position.id}
                  className="px-2 py-0.5 rounded text-xs bg-green-100 text-blue-700 border"
                >
                  {position.name}
                </span>
              ))
            : <span className="text-muted-foreground">No positions</span>
          }
        </div>
      );
    }
  },
  {
    accessorKey: "created_at",
    header: "Member since",
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
