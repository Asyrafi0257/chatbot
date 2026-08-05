"use client";

import { Mail } from "lucide-react";
import { useState } from "react";

export default function ForgotPassword(){
    const [email, setEmail] = useState("");

    const handleOTP = async () => {
        if(!email) return alert("Please enter your email");

        try{

            const otpRequest = await fetch("/api/forgot-password", {
                method : "POST",
                headers : {
                    "Content-type" : "application/json",
                },
                body : JSON.stringify({
                    email
                })
            });

            const response = await otpRequest.json();

            if(!otpRequest.ok) {
                return alert(response.message);
            }

            return alert("Please check your email to get OTP code.");

        }catch(error){
            console.log(error);
            return alert("Internal server problem, please try again!");
        }
    }
    return (
        <div className="flex flex-row h-screen justify-center items-center bg-[#0F1724]">
            <div className="h-[300px] w-[500px] bg-[#1E293B] rounded-xl shadow-[0_0_15px_#facc15] p-2">
                <h2 className="mt-2 text-white text-[30px] text-center font-bold font-pixel tracking-[2px]">Forgot Your <span className="text-yellow-500">Password?</span> </h2>
                <p className="text-gray-300 text-[12px] text-center tracking-[2px] font-pixel">Enter your email address to retrieve your password</p>

                <div className="mt-8 flex flex-col justify-center items-start w-[450px] ml-[60px]">
                    <label className="text-white uppercase text-[18px] font-bold font-pixel tracking-[3px]">Email</label>

                    <div className="flex flex-row mt-3 w-[360px] outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within: outline-yellow-500 rounded-md items-center justify-center">
                      <Mail className="text-gray-300 bg-yellow-500 rounded-l-md h-[33px] w-[50px] outline outline-2 outline-yellow-500 p-1"/>
                      <input type="email" placeholder="123@gmail.com" className="ml-3 w-full h-[20px] text-gray-300 outline-none border-none" value={email} onChange={(e) => setEmail(e.target.value)}/>  
                    </div>
                </div>
                <div className="mt-10 w-full flex flex-row justify-center item-center ">
                    <button className="text-white bg-yellow-500 w-[100px] h-[30px] rounded-md cursor-pointer" onClick={handleOTP}>Send OTP</button>
                </div>
            </div>
        </div>
    )
}