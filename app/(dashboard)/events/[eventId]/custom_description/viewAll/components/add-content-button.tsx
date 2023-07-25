"use client"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react'


interface AddContentProps {
    eventId: string;
    eventdescriptionId: string
}
const AddContent = ({ eventId, eventdescriptionId }: AddContentProps) => {
    const router = useRouter();
    return (
        <Button onClick={() => router.push(`/events/${eventId}/custom_description/title/${eventdescriptionId}/content/new`)}>
            <Plus className='mr-2 h-4 w-4' />
            Add content
            </Button>
    )
}

export default AddContent