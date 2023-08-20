"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PartnerColumn = {
    id:string;
    name: string;
    createdAt: string;
}

export const columns: ColumnDef<PartnerColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "createdAt",
        header: "createdAt",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
]