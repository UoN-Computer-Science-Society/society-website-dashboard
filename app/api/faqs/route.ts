import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    try {
        const { userId } = auth();

        const body = await req.json();

        const { question, answer } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!question) {
            return new NextResponse("question is required", { status: 400 });
        }
        if (!answer) {
            return new NextResponse("answer is required", { status: 400 });
        }

        const faq = await prismadb.faq.create({
            data: {
                question,
                answer,
            }
        })

        return NextResponse.json(faq);


    } catch (error) {
        console.log('[faq_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {

    try {

        const faqs = await prismadb.faq.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(faqs, { headers: corsHeaders });


    } catch (error) {
        console.log('[faqs_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}



const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

