import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { sendResetEmail } from "@/app/lib/mail";

export async function POST(request : NextRequest){
    try {
        const {email} = await request.json();

        //check email
        if(!email) {
            return NextResponse.json({
                success : false,
                message : "Email is required!"
            }, {
                status: 400,
            })
        };

        //check if user wujud or not
        const user = await prisma.user.findUnique({
            where : {
                email : email,
            }
        });

        if(!user){
            return NextResponse.json({
                success : false,
                message : "User not found in database!"
            }, {
                status: 404
            })
        }

         // Generate OTP baru
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // OTP valid untuk 5 minit
        const otpExpiredAt = new Date(
            Date.now() + 5 * 60 * 1000
        );

        // Update OTP baru dalam database
        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                otp: otp,
                otpExpiredAt: otpExpiredAt,
            },
        });

        //send email
        await sendResetEmail(email, otp);

         // Return expiry baru kepada frontend
        return NextResponse.json(
            {
                success: true,
                message: "New OTP has been sent!",
                otpExpiredAt: otpExpiredAt,
            },
            {
                status: 200,
            }
        );
    }catch (error) {
        console.error(
            "Resend OTP error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Server problem, please try again!",
            },
            {
                status: 500,
            }
        );
    }
}