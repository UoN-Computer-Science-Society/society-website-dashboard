import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { positionId: string } }) {

    try {
        const { userId } = auth();

        const body = await req.json();


        const { title, description, link, isArchived } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        }
        if (!description) {
            return new NextResponse("Description is required", { status: 400 });
        }

        if (!link) {
            return new NextResponse("Link is required", { status: 400 });
        }



        const position = await prismadb.position.updateMany({
            where: {
                id: params.positionId,
            },
            data: {
                title,
                description,
                link,
                isArchived
            }
        })

        return NextResponse.json(position);
    } catch (error) {

        console.log('[POSITION_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}


export async function DELETE(req: Request, { params }: { params: { positionId: string } }) {

    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const position = await prismadb.position.delete({
            where: {
                id: params.positionId,
            }
        })

        return NextResponse.json(position);
    } catch (error) {

        console.log('[POSITION_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }



}