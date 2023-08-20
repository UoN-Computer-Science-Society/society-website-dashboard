"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaqColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'

interface FaqClientProps {
    data: FaqColumn[]
}
const FaqClient = ({ data }: FaqClientProps) => {

    const router = useRouter()

    return (
        <>
            <div className='flex items-center justify-between '>

                <Heading
                    title={`Faq (${data.length})`}
                    description='Manage Faq display' />
                <Button onClick={() => router.push(`faqs/new`)}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add
                </Button>
            </div>
            <Separator />

            <DataTable columns={columns} data={data} searchKey='question' />

        </>
    )
}

export default FaqClient