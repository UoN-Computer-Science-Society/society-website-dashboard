import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const { userId } = auth();

        const body = await req.json();

        const { title,description, date, venue, imageUrl, link, isArchived } = body;

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

        const newDate = new Date(date);

        const dateString = newDate.toISOString();

        const event = await prismadb.event.create({
            data: {
                title,description, venue, imageUrl, link, isArchived, date: dateString
            }
        })

        return NextResponse.json(event);


    } catch (error) {
        console.log('[EVENT_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(req: Request) {

    try {

        const events = await prismadb.event.findMany({
            where: {
                isArchived: false,
            }
        })

        return NextResponse.json(events,{ headers: corsHeaders });


    } catch (error) {
        console.log('[EVENTS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}