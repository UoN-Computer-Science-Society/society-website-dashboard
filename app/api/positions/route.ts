import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

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

        const position = await prismadb.position.create({
            data: {
                title,
                description,
                link,
                isArchived
            }
        })

        return NextResponse.json(position);


    } catch (error) {
        console.log('[POSITION_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {

    try {

        const positions = await prismadb.position.findMany({
            where: {
                isArchived: false,
            }
        })

        return NextResponse.json(positions,{ headers: corsHeaders });


    } catch (error) {
        console.log('[POSITIONS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}



const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

