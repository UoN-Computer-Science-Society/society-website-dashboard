import EventForm from '@/components/form/event-form'
import prismadb from '@/lib/prismadb'
import React from 'react'



const EventPage = async ({ params }: { params: { eventId: string } }) => {

    const event = await prismadb.event.findUnique({
        where: {
            id: params.eventId
        },
    })


    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <EventForm initialData={event} />
            </div>
        </div>
    )
}

export default EventPage