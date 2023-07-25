"use client"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'


interface AddTitleProps {
    eventId: string | undefined

}
const AddTitle = ({ eventId}: AddTitleProps) => {
    const router = useRouter();
    return (
        <Button onClick={() => router.push(`/events/${eventId}/custom_description/title/new`)}>
            <Plus className='mr-2 h-4 w-4' />
            Add Title
            
            </Button>
    )
}

export default AddTitle