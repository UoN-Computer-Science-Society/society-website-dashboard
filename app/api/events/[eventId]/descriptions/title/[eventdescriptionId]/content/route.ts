import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { eventdescriptionId: string } }) {

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

        const hasOrder = eventDescriptionContentorder.some(event => event.order === order);

        if (hasOrder) {
            return new NextResponse("Order has been taken", { status: 400 });
        }

        const eventDescriptionContent = await prismadb.eventDescriptionContent.create({
            data: {
                description, order, eventDescriptionId: params.eventdescriptionId
            }
        })

        return NextResponse.json(eventDescriptionContent);


    } catch (error) {
        console.log('[EVENTDESCRIPTIONCONTENT_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


export async function GET(req: Request, { params }: { params: { eventdescriptionId: string } }) {

    try {

        const eventDescriptionContent = await prismadb.eventDescriptionContent.findMany({
            where: {
                eventDescriptionId: params.eventdescriptionId
            }
        }
        )

        return NextResponse.json(eventDescriptionContent, { headers: corsHeaders });



    } catch (error) {
        console.log('[EVENTDESCRIPTIONCONTENT_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}