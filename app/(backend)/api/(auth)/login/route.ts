import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request:NextRequest){
    try{

        const {email, password} = await request.json();

        //check if empty fields
        if(!email || !password) {
            return NextResponse.json({
                success: false,
                message:"Please fill all fields"
            }, {
                status:401
            })
        }

        //nk check ada ke tak dlaam database
        const existingEmail = await prisma.user.findUnique({
            where : {
                email
            }
        });

        if(!existingEmail){
            return NextResponse.json({
                success:false,
                message: "Email doesn't exist!"
            }, {
                status:409
            })
        }

        return NextResponse.json({
            success:true,
            message: "Login successfully!"
        }, {
            status:200
        })

    }catch(error){
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Internal server problem, Please try again!"
        }, {
            status:500
        })
    }
}