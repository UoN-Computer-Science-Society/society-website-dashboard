import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { faqId: string } }) {

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


        const faq = await prismadb.faq.updateMany({
            where: {
                id: params.faqId,
            },
            data: {
              question,
              answer
            }
        })

        return NextResponse.json(faq);
    } catch (error) {

        console.log('[faq_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}


export async function DELETE(req: Request, { params }: { params: { faqId: string } }) {

    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const faq = await prismadb.faq.delete({
            where: {
                id: params.faqId,
            }
        })

        return NextResponse.json(faq);
    } catch (error) {

        console.log('[faq_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }



}