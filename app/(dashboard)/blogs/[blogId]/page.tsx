import BlogForm from '@/components/form/blog-form'
import EventForm from '@/components/form/event-form'
import prismadb from '@/lib/prismadb'
import React from 'react'

const BlogPage = async ({ params }: { params: { blogId: string } }) => {

    const blog = await prismadb.blog.findUnique({
        where: {
            id: params.blogId
        },
        include: {
            images: true,
        }
    })


    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <BlogForm initialData={blog} />
            </div>
        </div>
    )
}

export default BlogPage