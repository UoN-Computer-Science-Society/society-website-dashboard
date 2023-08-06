import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

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

        const noticeboard = await prismadb.noticeBoard.create({
            data: {
                title,
                description,
                link,
                buttonText,
                isArchived
            }
        })

        return NextResponse.json(noticeboard);


    } catch (error) {
        console.log('[noticeboard_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {

    try {

        const noticeboards = await prismadb.noticeBoard.findMany({
            where: {
                isArchived: false,
            },
            orderBy:{
                createdAt: 'desc'
            }
        })

        return NextResponse.json(noticeboards,{ headers: corsHeaders });


    } catch (error) {
        console.log('[noticeboards_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}



const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

