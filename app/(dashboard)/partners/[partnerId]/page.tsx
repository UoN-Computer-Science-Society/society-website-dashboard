import PartnerForm from '@/components/form/partner-form'
import prismadb from '@/lib/prismadb'
import React from 'react'


const PartnerPage = async ({ params }: { params: { partnerId: string } }) => {

    const partner = await prismadb.partner.findUnique({
        where: {
            id: params.partnerId
        }
    })


    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <PartnerForm initialData={partner}/>
            </div>
        </div>
    )
}

export default PartnerPage