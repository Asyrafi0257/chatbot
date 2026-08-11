'use client'

import { Mail, LockKeyhole, MoveRight, Eye, EyeOff  } from "lucide-react"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"

export default function Login(){
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handlePassword = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = async () => {

        //check empty fields
        if(!email || !password) return alert("Please fill all fields!");

        try{

            const requestLogin = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body:JSON.stringify({
                    email,
                    password
                })
            });

            const dataLogin = await requestLogin.json();

            if(!requestLogin.ok) {
                return alert(dataLogin.message);
            }
            setEmail("");
            setPassword("");

            router.push("/dashboard");
            return alert("Login Successfully!");

        }catch(error){
            console.log(error);
            alert("Server Error!, Please try again.");
        }
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-[#0F172A]">
            <h2 className="text-white text-[60px] font-bold font-pixel tracking-[3px]"><span className="text-yellow-500">AI </span>Assist</h2>
            <p className="text-[16px] text-gray-300 tracking-[2px] font-pixel">connect with your AI bestie awaits</p>
            <div className="bg-[#1E293B] w-[500px] h-[420px] mt-7 p-3 rounded-xl shadow-[0_0_15px_#facc15] flex flex-col items-center">
                <h2 className="uppercase text-white text-[30px] tracking-[2px] font-bold font-pixel">Login</h2>

                {/* input email */}
                <div className=" flex flex-row mt-5 w-[350px] outline-1 outline-offset-1 outline-yellow-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 rounded-md">
                    <Mail className="text-gray-300 bg-yellow-500 rounded-l-md h-[33px] w-[50px] outline outline-2 outline-yellow-500 p-1"/>
                    <input type="email" placeholder="abc@gmail.com" className="border-none outline-none w-full text-white ml-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* input password */}
                <div className=" flex flex-row mt-5 w-[350px] outline-1 outline-offset-1 outline-yellow-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 rounded-md">
                    <LockKeyhole className="text-gray-300 bg-yellow-500 rounded-l-md h-[33px] w-[50px] outline outline-2 outline-yellow-500 p-1"/>
                    <input type={showPassword ? "text" : "password"} placeholder="password" className="border-none outline-none w-full text-white ml-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handlePassword} className="cursor-pointer text-gray-300 mr-3">
                        {showPassword ? (
                            <Eye/>
                        ): (
                            <EyeOff/>
                        )}
                    </button>
                </div>

                {/* forgot password */}
                <div className="w-[350] flex flex-row justify-end">
                    <Link className="text-white text-[13px] tracking-[2px] mt-2" href={"/forgot-password"}>forgot password</Link>
                </div>

                <div className="flex flex-row justify-center bg-yellow-500 w-[100px] h-[40px] p-2 mt-5 rounded-md shadow-[0_0_5px_#facc15] cursor-pointer">
                    <button className="text-white cursoir-pointer mr-2 tracking-[2px] text-[14px]"
                    onClick={handleLogin}
                    >Login</button>
                    <MoveRight className="text-white cursor-pointer text-[14px]"/>                    
                </div>

                {/* link untuk register */}
                <div className="w-full flex flex-row mt-5 justify-center">
                    <p className="tracking-[2px] text-white text-[13px]">Already have an account? <Link href={"/register"} className="text-yellow-500 [text-shadow:0_0_10px_#facc15]">Sign Up</Link></p>
                </div>

              {/* divider for login using google */}
              <div className="flex items-center my-5">
                <div className="flex-1 w-[80px] border-t-2 border-yellow-500 shadow-[0_0_20px_#facc15] "></div>
                <span className="font-bold font-pixel text-white tracking-[2px] mx-2"> Or With</span>
                <div className="flex-1 w-[200px] border-t-2 border-yellow-500 shadow-[0_0_20px_#facc15]"></div>
              </div>

              <div className="w-full flex flex-row justify-center">
                <Image
                    src="/images/logo-google.png"
                    alt="logo"
                    width={25}
                    height={25}
                    className="bg-white rounded-md p-1 cursor-pointer shadow-[0_0_5px_#facc15]"
                />
            </div>
            </div>
        </div>
    )
}