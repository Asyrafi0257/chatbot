import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest){
    try{

        const {userId} = await request.json();

        const conversation = await prisma.conversation.create({
            data: {
                userId : userId,
                title : "New Chat"
            }
        });

        return NextResponse.json({
            success:true,
            conversation
        }, {
            status: 200
        })

    }catch(error){
        return NextResponse.json({
            success:false,
            message:"Server Problem, Please try again",
        }, {
            status : 500
        })
    }
}