import React from 'react'
import prismadb from '@/lib/prismadb'
import format from 'date-fns/format'
import { PositionColumn } from './components/column'
import PositionClient from './components/client'
import Link from 'next/link'
import { Link2 } from 'lucide-react'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import Inquiry from '@/components/inquiry'

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

                <Heading title={'Additional resources'} description={''} />
                <Separator />

                <div className='py-3 flex-col gap-3'>
                    <h1 className='mb-4'>Below is the link to the position open section in the webpage</h1>

                    <Link href={`${process.env.WEBSITE_URL}/about-us`} target='blank'>
                        <div className='flex gap-3  my-4'>
                            <Link2 />{process.env.WEBSITE_URL}/about-us
                        </div>
                    </Link>

                   
                    <Inquiry />
                </div>
            </div>
        </div>

    )
}

export default PositionsPage