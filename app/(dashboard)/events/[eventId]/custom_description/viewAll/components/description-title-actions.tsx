"use client"
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Activity, Copy, Edit, MoreHorizontal, MoreVertical, Pen, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import AlertModal from '@/components/alert-modal'


interface TitleActionProps {
    id: string,
    eventId:string,
}

const TitleAction = ({id,eventId}: TitleActionProps) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);


    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Event Id copied to the clipboard");
    }

    const onUpdate = (id: string) => {
        router.push(`/events/${eventId}/custom_description/title/${id}`)
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/events/${eventId}/descriptions/title/${id}`);
            router.refresh();
            toast.success("Title Removed");
        } catch (error) {
            toast.error("Make sure to removed all content using this title first");
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
                    <Button>
                        <span className='sr-only'>Open Menu</span>
                        <Pen className='mr-2 h-4 w-4'/>
                       Actions
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(id)}>
                        <Copy className='h-4 w-4 mr-2' />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onUpdate(id)}>
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

export default TitleAction