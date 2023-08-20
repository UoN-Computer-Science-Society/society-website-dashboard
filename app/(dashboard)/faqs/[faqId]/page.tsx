import FaqForm from '@/components/form/faq-form'
import prismadb from '@/lib/prismadb'
import React from 'react'

const FaqPage = async ({ params }: { params: { faqId: string } }) => {

    const Faq = await prismadb.faq.findUnique({
        where: {
            id: params.faqId
        }
    })


    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <FaqForm initialData={Faq}/>
            </div>
        </div>
    )
}

export default FaqPage