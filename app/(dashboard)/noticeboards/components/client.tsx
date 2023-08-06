"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { NoticeBoardColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'

interface NoticeBoardClientProps {
    data: NoticeBoardColumn[]
}
const NoticeBoardClient = ({ data }: NoticeBoardClientProps) => {

    const router = useRouter()

    return (
        <>
            <div className='flex items-center justify-between '>

                <Heading
                    title={`NoticeBoard (${data.length})`}
                    description='Manage NoticeBoard display' />
                <Button onClick={() => router.push(`noticeboards/new`)}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add
                </Button>
            </div>
            <Separator />

            <DataTable columns={columns} data={data} searchKey='title' />

        </>
    )
}

export default NoticeBoardClient