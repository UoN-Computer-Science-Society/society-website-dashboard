import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Event, EventDescription } from '@prisma/client'
import React from 'react'
import TitleAction from './description-title-actions';
import AddContent from './add-content-button';
import DescriptionContent from './content';
import AddTitle from './add-title-button';


interface EventCustomDescriptionClientProps {
    event: Event | null;
    description: EventDescription[];
    eventId: string;
}

const EventCustomDescriptionClient = ({ event, description, eventId }: EventCustomDescriptionClientProps) => {

    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={event?.title} description='Manage the custom description here' />
                <AddTitle eventId={event?.id} />
            </div>
            <Separator />

            <div className='flex flex-col'>
                {description.length === 0 && <p>No result found. Try to add Something</p>}
                {description
                .sort((a, b) => parseInt(a.order) - parseInt(b.order)) // Convert to numbers and sort
                .map((item) => (

                    <div className='my-6 w-full' key={item.id}>

                        <div className='flex gap-4 items-center w-full justify-between mt-4'>

                            <h1 className='font-bold text-2xl'>DESCRIPTION TITLE {item.order}</h1>
                            <div className='flex gap-x-4 justify-between'>
                                <TitleAction id={item.id} eventId={eventId} />
                                <AddContent eventId={eventId} eventdescriptionId={item.id} />
                            </div>
                        </div>
                        <h1 className='font-bold text-xl mb-4'>{item.title}</h1>

                        <Separator />
                        <DescriptionContent eventdescriptionId={item.id} eventId={eventId} />
                    </div>
                ))}
            </div>


        </>
    )
}

export default EventCustomDescriptionClient