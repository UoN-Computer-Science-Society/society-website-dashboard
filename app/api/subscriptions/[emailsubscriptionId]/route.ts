import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { emailsubscriptionId: string } }) {

    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const emailSubcription = await prismadb.emailSubcription.delete({
            where: {
                id: params.emailsubscriptionId,
            }
        })

        return NextResponse.json(emailSubcription);
    } catch (error) {

        console.log('[EMAILSUBSCRIPTION_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}