import prismadb from '@/lib/prismadb';
import React from 'react'
import TitleAction from './components/description-title-actions';
import DescriptionContent from './components/content';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import AddContent from './components/add-content-button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import EventCustomDescriptionclient from './components/client';

const CustomDescriptionViewAllPage = async ({ params }: { params: { eventId: string } }) => {

    const description = await prismadb.eventDescription.findMany({
        where: {
            eventId: params.eventId
        },
    })

    const event = await prismadb.event.findUnique({
        where: {
            id: params.eventId
        },
    })

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <EventCustomDescriptionclient description={description} event={event} eventId={params.eventId} />
            </div>
        </div>

    )
}

export default CustomDescriptionViewAllPage