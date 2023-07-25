import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { eventId: string } }) {

    try {
        const { userId } = auth();

        const body = await req.json();

        const { title,order } = body;

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
        
        const hasOrder = eventDescriptionorder.some(event => event.order === order);
        
        if (hasOrder) {
            return new NextResponse("Order has been taken", { status: 400 });
        }
        

        const eventDescription = await prismadb.eventDescription.create({
            data: {
                title,order, eventId: params.eventId
            }
        })

        return NextResponse.json(eventDescription);


    } catch (error) {
        console.log('[EVENTDESCRIPTION_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
 

export async function GET(req: Request, { params }: { params: { eventId: string } }) {

    try {

        const eventDescription = await prismadb.eventDescription.findMany({
            where: {
                eventId: params.eventId
            }
        }
        )

        return NextResponse.json(eventDescription,{ headers: corsHeaders });



    } catch (error) {
        console.log('[EVENTDESCRIPTION_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}