"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BlogColumn = {
    id: string,
    title: string,
    content: string,
    date: string,
    venue: string,
    total: string,
    year: string,
    isArchived: boolean,
    createdAt: string,
}

export const columns: ColumnDef<BlogColumn>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "content",
        header: "Content",
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
        accessorKey: "year",
        header: "Academic year",
    },
    {
        accessorKey: "total",
        header: "Total Photo",
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