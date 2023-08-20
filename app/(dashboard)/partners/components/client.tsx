"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { PartnerColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'




interface PartnerClientProps {
    data: PartnerColumn[]
}
const PartnerClient = ({ data }: PartnerClientProps) => {

    const router = useRouter()

    return (
        <>
            <div className='flex items-center justify-between '>

                <Heading
                    title={`Partner (${data.length})`}
                    description='Manage Partner open' />
                <Button onClick={() => router.push(`/partners/new`)}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add
                </Button>
            </div>
            <Separator />

            <DataTable columns={columns} data={data} searchKey='name' />

        </>
    )
}

export default PartnerClient