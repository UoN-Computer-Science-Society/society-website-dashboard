import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { noticeboardId: string } }) {

    try {
        const { userId } = auth();

        const body = await req.json();


        const { title, description,buttonText, link, isArchived } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        }
        if (!description) {
            return new NextResponse("Description is required", { status: 400 });
        }
        if (!buttonText) {
            return new NextResponse("buttonText is required", { status: 400 });
        }
        if (!link) {
            return new NextResponse("Link is required", { status: 400 });
        }



        const noticeboard = await prismadb.noticeBoard.updateMany({
            where: {
                id: params.noticeboardId,
            },
            data: {
                title,
                description,
                buttonText,
                link,
                isArchived
            }
        })

        return NextResponse.json(noticeboard);
    } catch (error) {

        console.log('[noticeboard_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}


export async function DELETE(req: Request, { params }: { params: { noticeboardId: string } }) {

    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const noticeboard = await prismadb.noticeBoard.delete({
            where: {
                id: params.noticeboardId,
            }
        })

        return NextResponse.json(noticeboard);
    } catch (error) {

        console.log('[noticeboard_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }



}