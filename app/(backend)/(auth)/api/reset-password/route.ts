import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest){
    try{
        const { password, confirmPassword, email} = await request.json();

        if(!password || !confirmPassword) {
            return NextResponse.json({
                success : false,
                message : "Please fill all the fields"
            }, {
                status: 400
            })
        };

        if(password !== confirmPassword){
            return NextResponse.json({
                success : false,
                message : "Your password and confirm password not mathched"
            }, {
                status: 400
            })
        };

        if(password.length < 8 || confirmPassword.length < 8){
            return NextResponse.json({
                success : false,
                message : "At least length password must 8"
            }, {
                status: 400
            })
        };

        //cari user
        const user = await prisma.user.update({
            where : {
                email: email
            },
            data : {
                password: password
            }
        });

        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found!"
            }, {
                status: 409
            })
        };

        return NextResponse.json({
            success: false,
            message : "Your Password successfully reset"
        }, {
            status: 200
        })
    }catch(error){
        return NextResponse.json({
            success : false,
            message : "Internal server problem, Please try again!"
        }, {
            status: 500
        })
    }
}