import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { committeeId: string } }) {

    try {
        const { userId } = auth();

        const body = await req.json();

        const { name, title, year, email,imageUrl,order } = body;


        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!title) {
            return new NextResponse("Value is required", { status: 400 });
        }

        if (!year) {
            return new NextResponse("Year is required", { status: 400 });
        }

        if (!email) {
            return new NextResponse("Email is required", { status: 400 });
        }

        if (!order) {
            return new NextResponse("Order is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("ImageUrl is required", { status: 400 });
        }

        const committeeOrder = await prismadb.committee.findMany({
         
        });

        const hasOrder = committeeOrder.some(committee => committee.order === order && committee.id !== params.committeeId);
        
        if (hasOrder) {
            return new NextResponse("Order has been taken", { status: 400 });
        }

        const committee = await prismadb.committee.updateMany({
            where: {
                id: params.committeeId,
            },
            data: {
                name,
                title,
                year,
                email,
                imageUrl,
                order,
            }
        })

        return NextResponse.json(committee);
    } catch (error) {

        console.log('[COMMITTEE_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}


export async function DELETE(req: Request, { params }: { params: { committeeId: string } }) {

    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const committee = await prismadb.committee.delete({
            where: {
                id: params.committeeId,
            }
        })

        return NextResponse.json(committee);
    } catch (error) {

        console.log('[COMMITTEE_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }



}