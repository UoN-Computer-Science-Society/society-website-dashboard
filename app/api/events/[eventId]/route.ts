import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { eventId: string } }) {

    try {
        const { userId } = auth();

        const body = await req.json();

        const { title, description, date, venue, imageUrl, link, isArchived } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }


        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        }

        if (!description) {
            return new NextResponse("Description is required", { status: 400 });
        }

        if (!date) {
            return new NextResponse("Date is required", { status: 400 });
        }

        if (!venue) {
            return new NextResponse("venue is required", { status: 400 });
        }

        if (!link) {
            return new NextResponse("link is required", { status: 400 });
        }
        if (!imageUrl) {
            return new NextResponse("ImageUrl is required", { status: 400 });
        }


        const event = await prismadb.event.updateMany({
            where: {
                id: params.eventId,
            },
            data: {
                title, description, venue, imageUrl, link, isArchived, date
            }
        })

        return NextResponse.json(event);
    } catch (error) {

        console.log('[EVENT_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}


export async function DELETE(req: Request, { params }: { params: { eventId: string } }) {

    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const event = await prismadb.event.delete({
            where: {
                id: params.eventId,
            }
        })

        return NextResponse.json(event);
    } catch (error) {

        console.log('[EVENT_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }



}