import React from 'react'
import prismadb from '@/lib/prismadb'


import format from 'date-fns/format'
import CommitteeClient from './components/client'
import { CommitteeColumn } from './components/column'

const CommitteesPage = async () => {

    const committees = await prismadb.committee.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCommittees: CommitteeColumn[] = committees.map((item) => ({
        id: item.id,
        name: item.name,
        title: item.title,
        year: item.year,
        email: item.email,
        order:item.order,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CommitteeClient data={formattedCommittees} />
            </div>
        </div>

    )
}

export default CommitteesPage