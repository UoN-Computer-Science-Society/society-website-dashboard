import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { eventdescriptionId: string, eventdescriptioncontentId: string } }) {

    try {
        const { userId } = auth();

        const body = await req.json();

        const { description, order } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!description) {
            return new NextResponse("Description is required", { status: 400 });
        }

        if (!order) {
            return new NextResponse("Order is required", { status: 400 });
        }

        const eventDescriptionContentorder = await prismadb.eventDescriptionContent.findMany({
            where: {
                eventDescriptionId: params.eventdescriptionId
            },
        });

        const hasOrder = eventDescriptionContentorder.some(event => event.order === order && event.id !== params.eventdescriptioncontentId);

        if (hasOrder) {
            return new NextResponse("Order has been taken", { status: 400 });
        }


        const eventDescriptionContent = await prismadb.eventDescriptionContent.updateMany({
            where: {
                id: params.eventdescriptioncontentId
            },
            data: {
                description,order
            }
        })

        return NextResponse.json(eventDescriptionContent);


    } catch (error) {

        console.log('[EVENTDESCRIPTIONCONTENT_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}


export async function DELETE(req: Request, { params }: { params: { eventdescriptioncontentId: string } }) {

    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const eventDescriptionContent = await prismadb.eventDescriptionContent.delete({
            where: {
                id: params.eventdescriptioncontentId,
            }
        })

        return NextResponse.json(eventDescriptionContent);
    } catch (error) {

        console.log('[EVENTDESCRIPTIONCONTENT_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }



}