import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest){
    try{
        const email = request.nextUrl.searchParams.get("email");
        if(!email){
            return NextResponse.json({
                success: false,
                message : "Email is required"
            }, {
                status: 400
            })
        };

        //search user inside database
        const user = await prisma.user.findUnique({
            where:{
                email:email,
            },
            select:{
                username:true,
            }
        });

        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User not found!"
            }, {
                status: 404
            })
        };

        return NextResponse.json({
            username:user.username,
        }, {
            status:200
        });
        
    }catch(error){
        return NextResponse.json({
            success: false,
            message : "Server Problem, Please try again"
        }, {
            status: 500
        })
    }
}