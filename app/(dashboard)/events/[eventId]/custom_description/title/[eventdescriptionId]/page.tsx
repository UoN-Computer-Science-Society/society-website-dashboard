import EventCustomDescriptionTitleForm from '@/components/form/event-custom-description-title-form'
import prismadb from '@/lib/prismadb'
import React from 'react'



const CustomDescriptionTitle = async ({ params }: { params: { eventdescriptionId:string } }) => {

    const EventDescription = await prismadb.eventDescription.findUnique({
        where: {
            id: params.eventdescriptionId
        },
    })


    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <EventCustomDescriptionTitleForm initialData={EventDescription}/>
            </div>
        </div>
    )
}

export default CustomDescriptionTitle