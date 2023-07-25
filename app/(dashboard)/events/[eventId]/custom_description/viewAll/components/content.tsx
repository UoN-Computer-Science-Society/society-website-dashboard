
import { Button } from '@/components/ui/button'
import prismadb from '@/lib/prismadb'
import React from 'react'
import ContentAction from './description-content-actions'

interface descriptionContentProps {
    eventdescriptionId: string,
    eventId: string
}

const DescriptionContent = async ({ eventdescriptionId, eventId }: descriptionContentProps) => {

    const eventDescriptionContent = await prismadb.eventDescriptionContent.findMany({
        where: {
            eventDescriptionId: eventdescriptionId
        },
    })


    return (
        <div className='my-4'>
            {eventDescriptionContent.length === 0 &&
                <p>No result found. Try to create one.</p>
            }
            {eventDescriptionContent &&
                eventDescriptionContent
                    .sort((a, b) => parseInt(a.order) - parseInt(b.order)) // Convert to numbers and sort
                    .map((content) => (
                        <div key={content.id} className='flex items-center gap-x-8 justify-between my-3'>
                            <li>{content.description}</li>
                            <ContentAction id={content.id} eventId={eventId} eventdescriptionId={eventdescriptionId} />
                        </div>
                    ))}

        </div>
    )
}

export default DescriptionContent