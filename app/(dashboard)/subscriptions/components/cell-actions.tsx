"use client"
import React, { useState } from 'react'
import { SubscriptionColumn } from './column'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import AlertModal from '@/components/alert-modal'


interface CellActionProps {
    data: SubscriptionColumn
}

const CellAction = ({ data }: CellActionProps) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);



    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/subscriptions/${data.id}`);
            router.refresh();
            toast.success("subscription Removed");
        } catch (error) {
            toast.error("Error in deleting subscription");
            console.log("Delete" + error)
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal isOpen={open} loading={loading} onClose={() => setOpen(false)} onConfirm={onDelete} />

            <Button
                variant='ghost'
                className='h-8 w-8 p-0'
                onClick={() => setOpen(true)}
            >
                <Trash className='h-4 w-4 mr-2' />
            </Button>


        </>
    )
}

export default CellAction