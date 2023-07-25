"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PositionColumn = {
    id: string;
    title: string;
    description: string;
    link: string;
    isArchived: boolean;
    createdAt: string;
}

export const columns: ColumnDef<PositionColumn>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "link",
        header: "Link",
    },
    {
        accessorKey: "isArchived",
        header: "isArchived",
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