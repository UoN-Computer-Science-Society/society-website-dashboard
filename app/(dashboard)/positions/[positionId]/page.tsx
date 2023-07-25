import PositionForm from '@/components/form/position-form'
import prismadb from '@/lib/prismadb'
import React from 'react'


const PositionPage = async ({ params }: { params: { positionId: string } }) => {

    const position = await prismadb.position.findUnique({
        where: {
            id: params.positionId
        }
    })


    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <PositionForm initialData={position}/>
            </div>
        </div>
    )
}

export default PositionPage