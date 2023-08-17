import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}


export async function POST(req: Request) {

    try {

        const body = await req.json();

        const { email} = body;

        if (!email) {
            return new NextResponse("Email is required", { status: 400 });
        }

        const emailSubcription = await prismadb.emailSubcription.create({
            data: {
                email,
            }
        })

        return NextResponse.json(emailSubcription, { headers: corsHeaders });

    } catch (error) {
        console.log('[SUBSCRIPTION_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    try {

        const emailSubcriptions = await prismadb.emailSubcription.findMany()

        return NextResponse.json(emailSubcriptions);

    } catch (error) {
        console.log('[COMMITTEES_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};