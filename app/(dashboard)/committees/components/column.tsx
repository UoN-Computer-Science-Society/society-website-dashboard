"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CommitteeColumn = {
    id: string;
    name: string;
    title: string;
    year: string;
    email: string;
    order:string;
    createdAt: string;
}

export const columns: ColumnDef< CommitteeColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "year",
        header: "Year",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "order",
        header: "Order",
    },
    {
        accessorKey: "createdAt",
        header: "createdAt",
    },
    {
        id: "actions",
        header:"Actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
]