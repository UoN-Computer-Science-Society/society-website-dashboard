import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const { userId } = auth();

        const body = await req.json();

        const { name, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!imageUrl) {
            return new NextResponse("ImageUrl is required", { status: 400 });
        }

        const partner = await prismadb.partner.create({
            data: {
                name,
                imageUrl,
            }
        })

        return NextResponse.json(partner);


    } catch (error) {
        console.log('[partners_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {

    try {

        const partners = await prismadb.partner.findMany();

        return NextResponse.json(partners, { headers: corsHeaders });

    } catch (error) {
        console.log('[partners_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};