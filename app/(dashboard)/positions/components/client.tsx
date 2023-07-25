"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { PositionColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'




interface PositionClientProps {
    data: PositionColumn[]
}
const PositionClient = ({ data }: PositionClientProps) => {

    const router = useRouter()

    return (
        <>
            <div className='flex items-center justify-between '>

                <Heading
                    title={`Position (${data.length})`}
                    description='Manage position open' />
                <Button onClick={() => router.push(`/positions/new`)}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add
                </Button>
            </div>
            <Separator />

            <DataTable columns={columns} data={data} searchKey='title' />

        </>
    )
}

export default PositionClient