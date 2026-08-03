import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import {prisma} from "@/app/lib/prisma";


export async function POST(request : NextRequest){
    try{
        const {fullname, username, email, phone, password, confirmPassword} = await request.json();

        //check if password not same with confirm password
        if(password !== confirmPassword) {
            return NextResponse.json({
                success: false,
                message:"Password and confirm password not matched!"
            },{
                status: 400
            })
        };

        //check if fill empty
        if(!fullname || !username || !email || !phone || !password || !confirmPassword){
            return NextResponse.json({
                success: false,
                message: "Please fill all fields!"
            },{
                status : 400
            })
        };

        //check if length password less than 8
        if(password.length < 8){
            return NextResponse.json({
                success:false,
                message: "You must use a password that is at least 8 characters long!"
            },{
                status : 400
            })
        };

        //check email if alreadt exist
        const existingEmail = await prisma.user.findUnique({
            where : {
                email,
            }
        });

        if(existingEmail){
            return NextResponse.json({
                success: false,
                message: "Email already exist",
            },{
                status: 409 //conflict email
            })
        };

        //hash password
        const hashPassword = await bcrypt.hash(password, 10);

        //save user
        const user = await prisma.user.create({
            data : {
                fullname,
                username,
                email,
                phone,
                password : hashPassword,
            },

            select : {
                id : true,
                fullname:true,
                username: true,
                email: true,
                phone: true,
                createdAt: true,
                updatedAt : true
            }
        });

        return NextResponse.json({
            success: true,
            message: "You account successfully register",
            user
        }, {
            status: 200,
        })
    }catch(error){
        console.error("Internal server problem, Try again!")
        return NextResponse.json({
            success: false,
            message : " Internal server problem, please try again!"
        }, {
            status: 500
        })
    }
}