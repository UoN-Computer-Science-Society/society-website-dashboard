import React from 'react'
import prismadb from '@/lib/prismadb'
import format from 'date-fns/format'
import Link from 'next/link'
import { Link2 } from 'lucide-react'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import Inquiry from '@/components/inquiry'
import { PartnerColumn } from './components/column'
import PartnerClient from './components/client'

const PartnersPage = async () => {

    const partners = await prismadb.partner.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedPartners: PartnerColumn[] = partners.map((item) => ({
        id: item.id,
        name: item.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <PartnerClient data={formattedPartners} />

                <Heading title={'Additional resources'} description={''} />
                <Separator />

                <div className='py-3 flex-col gap-3'>
                    <h1 className='mb-4'>Below is the link to the Partner open section in the webpage</h1>

                    <Link href={`${process.env.WEBSITE_URL}/about-us`} target='blank'>
                        <div className='flex gap-3  my-4'>
                            <Link2 />{process.env.WEBSITE_URL}
                        </div>
                    </Link>


                    <Inquiry />
                </div>
            </div>
        </div>

    )
}

export default PartnersPage