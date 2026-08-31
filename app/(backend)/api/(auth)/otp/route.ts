import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest){
    try{
        const email = request.nextUrl.searchParams.get("email");

        if(!email){
            return NextResponse.json({
                success:false,
                message: "Email is required!"
            }, {
                status:400
            })
        }

        //search user inside database
        const user = await prisma.user.findUnique({
            where: {
                email : email
            },
            select : {
                otpExpiredAt:true
            }
        });

        //if user tak ada dalam database
        if(!user){
            return NextResponse.json({
                success:false,
                message: "User not found!"
            }, {
                status:404
            })
        }

        //yang akan return ke frontend(user)
        return NextResponse.json({
            otpExpiredAt : user.otpExpiredAt,
        }, {
            status:200
        });
    }catch(error){
        console.log(error);
        return NextResponse.json({
            success:false,
            message: "Server problem, Please try again!"
        },{
            status:500
        })
    }
}