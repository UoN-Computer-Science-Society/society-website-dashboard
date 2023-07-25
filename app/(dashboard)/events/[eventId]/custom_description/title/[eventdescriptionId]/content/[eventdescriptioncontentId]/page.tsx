import EventCustomDescriptionContentForm from '@/components/form/event-custom-description-content-form'
import prismadb from '@/lib/prismadb'
import React from 'react'

const CustomDescriptionContent = async ({ params }: { params: { eventdescriptioncontentId: string } }) => {

    const EventDescriptionContent = await prismadb.eventDescriptionContent.findUnique({
        where:{
            id: params.eventdescriptioncontentId,
        }
    })


  return (
    <div className='flex-col'>
    <div className='flex-1 space-y-4 p-8 pt-6'>
        <EventCustomDescriptionContentForm initialData={EventDescriptionContent} />
    </div>
</div>
  )
}

export default CustomDescriptionContent