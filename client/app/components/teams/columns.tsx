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
        <AddTeamMember team={row.original} />
      )
    },
  },
];
