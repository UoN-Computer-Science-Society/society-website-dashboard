import React from 'react'
import prismadb from '@/lib/prismadb'
import format from 'date-fns/format'
import { FaqColumn } from './components/column'
import Link from 'next/link'
import { Link2 } from 'lucide-react'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import Inquiry from '@/components/inquiry'
import FaqClient from './components/client'

const FaqsPage = async () => {

    const faqs = await prismadb.faq.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedfaqs: FaqColumn[] = faqs.map((item) => ({
        id: item.id,
        question: item.question,
        answer: item.answer,
        updatedAt: format(item.updatedAt, "MMMM do, yyyy"),
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <FaqClient data={formattedfaqs} />

                <Heading title={'Additional resources'} description={''} />
                <Separator />

                <div className='py-3 flex-col gap-3'>
                    <h1 className='mb-4'>Below is the link to the faq section in the webpage</h1>

                    <Link href={`${process.env.WEBSITE_URL}`} target='blank'>
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

export default FaqsPage