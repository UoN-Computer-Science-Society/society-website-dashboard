import React from 'react'
import prismadb from '@/lib/prismadb'
import format from 'date-fns/format'
import {  SubscriptionColumn } from './components/column'
import SubscriptionClient from './components/client'

const SubscriptionPage = async () => {

    const  emailSubcription = await prismadb.emailSubcription.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedSubscription: SubscriptionColumn[] = emailSubcription.map((item) => ({
        id: item.id,
        name:item.name,
        email:item.email,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <SubscriptionClient data={formattedSubscription} />
            </div>
        </div>

    )
}

export default  SubscriptionPage