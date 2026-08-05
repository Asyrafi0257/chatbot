import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,   
    }
});

export async function sendResetEmail(email: string, otp:string){
    try{
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password reset OTP",
            html: `<h2> Password Reset</h2>
                   <p> Your OTP is : </p>
                   <p> ${otp}</p>
            `
        })
    }catch(error){
        console.log(error);
        alert("Email Error");
    }
}