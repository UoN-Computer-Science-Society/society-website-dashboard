import NoticeBoardForm from '@/components/form/noticeboard-form'
import PositionForm from '@/components/form/position-form'
import prismadb from '@/lib/prismadb'
import React from 'react'


const NoticeBoardPage = async ({ params }: { params: { noticeboardId: string } }) => {

    const NoticeBoard = await prismadb.noticeBoard.findUnique({
        where: {
            id: params.noticeboardId
        }
    })


    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <NoticeBoardForm initialData={NoticeBoard}/>
            </div>
        </div>
    )
}

export default NoticeBoardPage