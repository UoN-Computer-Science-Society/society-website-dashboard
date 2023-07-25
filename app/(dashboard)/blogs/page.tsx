import React from 'react'
import prismadb from '@/lib/prismadb'


import format from 'date-fns/format'
import BlogClient from './components/client'
import { BlogColumn } from './components/column'

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
            </div>
        </div>

    )
}

export default BlogsPage