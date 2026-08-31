import { NextResponse, NextRequest} from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request:NextRequest){
    try {
        const {email, otp} = await request.json();

        //check email and otp
        if(!email || !otp) {
            return NextResponse.json({
                success :false,
                message : "Email and otp are required"
            }, {
                status: 400
            })
        }

        //search user in database based on email
        const user = await prisma.user.findUnique({
            where : {
                email : email,
            },
            select : {
                otp:true,
                otpExpiredAt : true,
            }
        });

        //check user ada ke tak
        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found in database!"
            }, {
                status: 404
            });
        }

        //check otp
        if(user.otp !== otp){
            return NextResponse.json({
                success : false,
                message : "Invalid OTP!"
            }, {
                status: 400
            })
        };

        //check otp expired
        if(!user.otpExpiredAt || new Date(user.otpExpiredAt).getTime() <= Date.now()){
            return NextResponse.json({
                success : false,
                message : "OTP has expired!"
            }, {
                status : 400,
            })
        };

        //otp valid and not expired
        return NextResponse.json({
            success: false,
            message : "OTP verified successfully"
        }, {
            status : 200
        })
    } catch(error){
        console.error("Verify OTP error:", error);
        return NextResponse.json({
            success : false,
            message : "Server problem, Pleae try again!",
        }, {
            status : 500
        })
    }
}