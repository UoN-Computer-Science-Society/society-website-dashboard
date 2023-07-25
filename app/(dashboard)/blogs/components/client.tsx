"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Eye, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BlogColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'

interface BlogClientProps {
    data: BlogColumn[]
}
const BlogClient = ({ data }: BlogClientProps) => {

    const router = useRouter()

    return (
        <>
            <div className='flex items-center justify-between '>

                <Heading
                    title={`Blog (${data.length})`}
                    description='Manage Blogs' />
                <Button onClick={() => router.push(`/blogs/new`)}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add
                </Button>
            </div>
            <Separator />

            <DataTable columns={columns} data={data} searchKey='title' />





        </>
    )
}

export default BlogClient