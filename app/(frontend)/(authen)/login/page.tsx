'use client'

import { Mail, LockKeyhole, MoveRight, Eye, EyeOff  } from "lucide-react"
import Link from "next/link";
import { useState } from "react";

export default function Login(){
    const [showPassword, setShowPassword] = useState(true);

    const handlePassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className="flex flex-col h-screen justify-center items-center bg-[#0F172A]">
            <h2 className="text-white text-[60px] font-bold font-pixel tracking-[3px]"><span className="text-yellow-500">AI </span>Assist</h2>
            <p className="text-[16px] text-gray-300 tracking-[2px] font-pixel">connect with your AI bestie awaits</p>
            <div className="bg-[#1E293B] w-[500px] h-[330px] mt-7 p-3 rounded-xl shadow-[0_0_15px_#facc15] flex flex-col items-center">
                <h2 className="uppercase text-white text-[30px] tracking-[2px] font-bold font-pixel">Login</h2>

                {/* input email */}
                <div className=" flex flex-row mt-5 w-[350px] outline-1 outline-offset-1 outline-yellow-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 rounded-md p-2">
                    <Mail className="text-gray-300"/>
                    <input type="email" placeholder="abc@gmail.com" className="border-none outline-none w-full text-white ml-3"/>
                </div>

                {/* input password */}
                <div className=" flex flex-row mt-5 w-[350px] outline-1 outline-offset-1 outline-yellow-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 rounded-md p-2">
                    <LockKeyhole className="text-gray-300"/>
                    <input type={showPassword ? "text" : "password"} placeholder="password" className="border-none outline-none w-full text-white ml-3"/>
                    <button onClick={handlePassword} className="cursor-pointer text-gray-300">
                        {showPassword ? (
                            <Eye/>
                        ): (
                            <EyeOff/>
                        )}
                    </button>
                </div>

                {/* forgot password */}
                <div className="w-[350] flex flex-row justify-end">
                    <Link className="text-white text-[13px] tracking-[2px] mt-2" href={""}>forgot password</Link>
                </div>

                <div className="flex flex-row justify-center bg-yellow-500 w-[100px] h-[40px] p-2 mt-5 rounded-md shadow-[0_0_5px_#facc15] cursor-pointer">
                    <button className="text-white cursoir-pointer mr-2 tracking-[2px] text-[14px]">Login</button>
                    <MoveRight className="text-white cursor-pointer text-[14px]"/>                    
                </div>

                {/* link untuk register */}
                <div className="w-full flex flex-row mt-5 justify-center">
                    <p className="tracking-[2px] text-white text-[13px]">Already have an account? <Link href={"/register"} className="text-yellow-500 [text-shadow:0_0_10px_#facc15]">Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}