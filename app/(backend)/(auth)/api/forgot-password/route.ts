import { NextResponse, NextRequest} from "next/server";
import { prisma } from "@/app/lib/prisma";
import { sendResetEmail } from "@/app/lib/mail";

export async function POST(request:NextRequest){
    try{

    const {email} = await request.json();

    if(!email) {
        return NextResponse.json({
            success: false,
            message: "Email not Exist!",
        }, {
            status: 400
        })
    }

    //find email user in database
   const user = await prisma.user.findUnique({
    where : {
        email,
    }
   });

   if(!user) {
    return NextResponse.json({
        message: "If the email exists, we have sent an OTP."
    })
   }

   //generate OTP
   const otp = Math.floor(1000 + Math.random() * 900000).toString();

   //expired OTP (5 minutes)
   const expiredOTP  = new Date(Date.now() + 5 * 60 * 1000);

   //save OTP
   await prisma.user.update({
    where : {
        email,
    },
    data : {
        otp,
        otpExpiredAt : expiredOTP,
    }
   });

   //send email
   await sendResetEmail(email, otp);

   return NextResponse.json({
    success:true,
    message : "OTP has been sent successfully"
   }, {
    status:200
   })

}catch(error){
    console.log(error);
    return NextResponse.json({
        success: false,
        message : "Server error, Please try again!",
    }, {
        status : 500
    })
} 
}


