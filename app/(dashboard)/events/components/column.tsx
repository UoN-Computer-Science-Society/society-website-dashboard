"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type EventColumn = {
    id: string,
    title: string,
    description: string,
    date: string,
    venue: string,
    imageUrl: string,
    link: string,
    isArchived: boolean,
    createdAt: string,
}

export const columns: ColumnDef<EventColumn>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "date",
        header: "DateTime",
    },
    {
        accessorKey: "venue",
        header: "Venue",
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
        header: "CreatedAt",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
]