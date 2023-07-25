import React from 'react'
import prismadb from '@/lib/prismadb'


import format from 'date-fns/format'
import EventClient from './components/client'
import { EventColumn } from './components/column'

const EventsPage = async () => {

    const events = await prismadb.event.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include:{
            eventdescription:true
        }
    })

    const formattedEvents: EventColumn[] = events.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        date: format(item.date, "MMMM do, yyyy 'at' h:mm a"),
        venue: item.venue,
        imageUrl: item.imageUrl,
        link: item.link,
        isArchived: item.isArchived,
        createdAt: format(item.createdAt, "MMMM do, yyyy 'at' h:mm a"),
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <EventClient data={formattedEvents} />
            </div>
        </div>

    )
}

export default EventsPage