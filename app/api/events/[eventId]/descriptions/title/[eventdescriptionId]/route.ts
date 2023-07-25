import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { eventId: string, eventdescriptionId: string } }) {

    try {
        const { userId } = auth();

        const body = await req.json();

        const { title, order } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        }


        if (!order) {
            return new NextResponse("Order is required", { status: 400 });
        }

        const eventDescriptionorder = await prismadb.eventDescription.findMany({
            where: {
                eventId: params.eventId,
            },
        });

        const hasOrder = eventDescriptionorder.some(event => event.order === order && event.id !== params.eventdescriptionId);

        if (hasOrder) {
            return new NextResponse("Order has been taken", { status: 400 });
        }



        const eventDescription = await prismadb.eventDescription.updateMany({
            where: {
                id: params.eventdescriptionId,
            },
            data: {
                title, order
            }
        })

        return NextResponse.json(eventDescription);


    } catch (error) {

        console.log('[EVENTDESCRIPTION_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}


export async function DELETE(req: Request, { params }: { params: { eventdescriptionId: string } }) {

    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const eventDescription = await prismadb.eventDescription.delete({
            where: {
                id: params.eventdescriptionId,
            }
        })

        return NextResponse.json(eventDescription);
    } catch (error) {

        console.log('[EVENTDESCRIPTION_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }



}