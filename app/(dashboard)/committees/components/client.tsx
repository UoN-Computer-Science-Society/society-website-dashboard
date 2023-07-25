"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { CommitteeColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'




interface CommitteeClientProps {
    data: CommitteeColumn[]
}
const CommitteeClient = ({ data }: CommitteeClientProps) => {

    const router = useRouter()

    return (
        <>
            <div className='flex items-center justify-between '>

                <Heading
                    title={`Committee (${data.length})`}
                    description='Manage committee member' />
                <Button onClick={() => router.push(`/committees/new`)}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add
                </Button>
            </div>
            <Separator />

            <DataTable columns={columns} data={data} searchKey='name' />

        </>
    )
}

export default CommitteeClient