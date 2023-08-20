import React from 'react'
import prismadb from '@/lib/prismadb'
import format from 'date-fns/format'
import { NoticeBoardColumn } from './components/column'
import Link from 'next/link'
import { Link2 } from 'lucide-react'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import Inquiry from '@/components/inquiry'
import NoticeBoardClient from './components/client'

const NoticeBoardsPage = async () => {

    const NoticeBoards = await prismadb.noticeBoard.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedNoticeBoards: NoticeBoardColumn[] = NoticeBoards.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        buttonText: item.buttonText,
        link: item.link,
        isArchived: item.isArchived,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <NoticeBoardClient data={formattedNoticeBoards} />

                <Heading title={'Additional resources'} description={''} />
                <Separator />

                <div className='py-3 flex-col gap-3'>
                    <h1 className='mb-4'>Below is the link to the noticeBoard section in the webpage</h1>

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

export default NoticeBoardsPage