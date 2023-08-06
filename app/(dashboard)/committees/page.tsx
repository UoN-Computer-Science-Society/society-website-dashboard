import React from 'react'
import prismadb from '@/lib/prismadb'


import format from 'date-fns/format'
import CommitteeClient from './components/client'
import { CommitteeColumn } from './components/column'
import Image from 'next/image'
import { Link2, Mail } from 'lucide-react'
import Link from 'next/link'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import Inquiry from '@/components/inquiry'


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
        order: item.order,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CommitteeClient data={formattedCommittees} />

                <Heading title={'Additional resources'} description={''} />
                <Separator />

                <div className='py-3 flex-col gap-3'>
                    <h1 className='mb-4'>Below is the link to the committee details section in the webpage</h1>

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

export default CommitteesPage