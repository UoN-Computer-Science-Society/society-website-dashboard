import React from 'react'
import prismadb from '@/lib/prismadb'


import format from 'date-fns/format'
import BlogClient from './components/client'
import { BlogColumn } from './components/column'
import Link from 'next/link'
import { Link2 } from 'lucide-react'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import Inquiry from '@/components/inquiry'

const BlogsPage = async () => {

    const blogs = await prismadb.blog.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            images: true
        }
    })

    const formattedBlogs: BlogColumn[] = blogs.map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        date: format(item.date, "MMMM do, yyyy 'at' h:mm a"),
        venue: item.venue,
        year: item.year,
        total: item.images.length.toString(),
        isArchived: item.isArchived,
        createdAt: format(item.createdAt, "MMMM do, yyyy 'at' h:mm a"),
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <BlogClient data={formattedBlogs} />
                
                <Heading title={'Additional resources'} description={''} />
                <Separator />

                <div className='py-3 flex-col gap-3'>
                    <h1 className='mb-4'>Below is the link to the events section in the webpage</h1>

                    <Link href={`${process.env.WEBSITE_URL}/events`} target='blank'>
                        <div className='flex gap-3  my-4'>
                            <Link2 />{process.env.WEBSITE_URL}/events
                        </div>
                    </Link>

                    
                    <Inquiry />
                </div>
            </div>
        </div>

    )
}

export default BlogsPage