import CommitteeForm from '@/components/form/committee-form'
import prismadb from '@/lib/prismadb'
import React from 'react'


const CommitteePage = async ({ params }: { params: { committeeId: string } }) => {

    const committee = await prismadb.committee.findUnique({
        where: {
            id: params.committeeId
        }
    })


    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CommitteeForm initialData={committee}/>
            </div>
        </div>
    )
}

export default CommitteePage