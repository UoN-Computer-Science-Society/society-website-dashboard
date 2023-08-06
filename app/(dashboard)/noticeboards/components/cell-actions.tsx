"use client"
import React, { useState } from 'react'
import { NoticeBoardColumn} from './column'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import AlertModal from '@/components/alert-modal'


interface CellActionProps {
    data: NoticeBoardColumn
}

const CellAction = ({ data }: CellActionProps) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onUpdate = (id: string) => {
        router.push(`/noticeboards/${id}`)
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/noticeboards/${data.id}`);
            router.refresh();
            toast.success("noticeboards Removed");
        } catch (error) {
            toast.error("Error in deleting noticeboards");
            console.log("Delete" + error)
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal isOpen={open} loading={loading} onClose={() => setOpen(false)} onConfirm={onDelete} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='ghost'
                        className='h-8 w-8 p-0'
                    >
                        <span className='sr-only'>Open Menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onUpdate(data.id)}>
                        <Edit className='h-4 w-4 mr-2' />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className='h-4 w-4 mr-2' />
                        Remove
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}

export default CellAction