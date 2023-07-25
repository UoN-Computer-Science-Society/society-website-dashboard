import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const { userId } = auth();

        const body = await req.json();

        const { title, content, date, venue, year, images, coverImageUrl, isArchived } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }


        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        }

        if (!content) {
            return new NextResponse("Description is required", { status: 400 });
        }

        if (!date) {
            return new NextResponse("Date is required", { status: 400 });
        }

        if (!venue) {
            return new NextResponse("venue is required", { status: 400 });
        }

        if (!year) {
            return new NextResponse("academic year is required", { status: 400 });
        }

        if (!coverImageUrl) {
            return new NextResponse("cover Image is required", { status: 400 });
        }

        if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 });
        }

        const newDate = new Date(date);

        const dateString = newDate.toISOString();

        const blog = await prismadb.blog.create({
            data: {
                title, content, venue, year, isArchived, coverImageUrl, date: dateString, images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image),
                        ],
                    },
                },
            }
        })

        return NextResponse.json(blog);


    } catch (error) {
        console.log('[blog_POST]', error);
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

        const blogs = await prismadb.blog.findMany({
            where: {
                isArchived: false,
            },
            include: {
                images: true,
            }
        })

        return NextResponse.json(blogs, { headers: corsHeaders });


    } catch (error) {
        console.log('[BLOGS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}