"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FaqColumn = {
    id: string;
    question: string;
    answer: string;
    createdAt: string;
    updatedAt:string;
}

export const columns: ColumnDef<FaqColumn>[] = [
    {
        accessorKey: "question",
        header: "Question",
    },
    {
        accessorKey: "answer",
        header: "Answer",
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