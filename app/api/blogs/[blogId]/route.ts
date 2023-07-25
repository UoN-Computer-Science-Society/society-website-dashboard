import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { blogId: string } }) {

    try {
        const { userId } = auth();

        const body = await req.json();

        const { title, content, date, coverImageUrl, venue, year, images, isArchived } = body;

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


        if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 });
        }

        if (!coverImageUrl) {
            return new NextResponse("cover Image is required", { status: 400 });
        }


        const newDate = new Date(date);

        const dateString = newDate.toISOString();

        await prismadb.blog.update({
            where: {
                id: params.blogId
            },
            data: {
                title, content, venue, year, isArchived, coverImageUrl, date: dateString,
                images: {
                    deleteMany: {},
                },

            },
        });

        const blog = await prismadb.blog.update({
            where: {
                id: params.blogId
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image),
                        ],
                    },
                },
            },
        })

        return NextResponse.json(blog);
    } catch (error) {

        console.log('[BLOG_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}


export async function DELETE(req: Request, { params }: { params: { blogId: string } }) {

    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const blog = await prismadb.blog.delete({
            where: {
                id: params.blogId,
            }
        })

        return NextResponse.json(blog);
    } catch (error) {

        console.log('[BLOG_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }



}