"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Download, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubscriptionColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'
import { convertToExcel } from '@/lib/excel'




interface SubscriptionClientProps {
    data: SubscriptionColumn[]
}
const SubscriptionClient = ({ data }: SubscriptionClientProps) => {

    const router = useRouter();

    const handleExport = async () => {
       await convertToExcel(data, 'subscriptionList');
    };


    return (
        <>
            <div className='flex items-center justify-between '>

                <Heading
                    title={`Subscription (${data.length})`}
                    description='See subscription list' />

                <Button onClick={handleExport}>
                    <Download className='mr-2 h-4 w-4' />
                    Export
                </Button>
            </div>

            <Separator />

            <DataTable columns={columns} data={data} searchKey='email' />

        </>
    )
}

export default SubscriptionClient