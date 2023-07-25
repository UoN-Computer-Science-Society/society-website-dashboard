import React from 'react'
import prismadb from '@/lib/prismadb'
import format from 'date-fns/format'
import { PositionColumn } from './components/column'
import PositionClient from './components/client'

const PositionsPage = async () => {

    const positions = await prismadb.position.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedPositions: PositionColumn[] = positions.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        link: item.link,
        isArchived: item.isArchived,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <PositionClient data={formattedPositions} />
            </div>
        </div>

    )
}

export default  PositionsPage