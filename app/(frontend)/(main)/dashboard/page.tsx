"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard(){
    const [nameUser, setNameUser] = useState("");

    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const router =  useRouter();

    console.log(email);

    useEffect(() => {
        if(!email) {
            console.log("Email is missing");
            return;
        }

        const getUserName = async () => {
                try{
                    const response = await fetch(`/api/dashboard?email=${encodeURIComponent(email)}`);
                    const nameUser = await response.json();
                    setNameUser(nameUser.username);
                    
                }catch(error){
                    return alert("server problem, please try again");
                }
        };

        getUserName();
    },[email]);

  

    return (
        <div className="flex flex-col h-screen bg-[#0F172A] justify-center items-center">
            <h2 className="text-white text-[40px] font-bold font-pixel tracking-[3px]">Welcome back, <span className="text-yellow-500">{nameUser}</span></h2>
            <p className="text-gray-300 tracking-[2px] font-pixel text-[15px] text-center w-[700px]">You can use all these features inside this system to help you to solve your task, question and others. </p>

            <div className="flex flex-col mt-13 justify-center items-center w-full">
                <div className="flex flex-row bg-yellow-500 w-[300px] h-[40px] rounded-md cursor-pointer shadow-[0_0_8px_#facc15] items-center mb-5">
                    <button className="h-full w-full cursor-pointer text-white font-bold font-pixel tracking-[4px]" onClick={() => router.push("/chat")}>Chat</button>
                </div>

                <div className="flex flex-row bg-yellow-500 w-[300px] h-[40px] rounded-md cursor-pointer shadow-[0_0_8px_#facc15] items-center mb-5">
                    <button className="h-full w-full cursor-pointer text-white font-bold font-pixel tracking-[4px]" onClick={() => router.push("/history-chat")}>History chat</button>
                </div>

                <div className="flex flex-row bg-yellow-500 w-[300px] h-[40px] rounded-md cursor-pointer shadow-[0_0_8px_#facc15] items-center mb-5">
                    <button className="h-full w-full cursor-pointer text-white font-bold font-pixel tracking-[4px]" onClick={() => router.push("/settings")}>Settings</button>
                </div>

                <div className="flex flex-row bg-yellow-500 w-[300px] h-[40px] rounded-md cursor-pointer shadow-[0_0_8px_#facc15] items-center mb-5">
                    <button className="h-full w-full cursor-pointer text-white font-bold font-pixel tracking-[4px]" onClick={() => router.push("/contact-us")}>Contact Us</button>
                </div>
            </div>
        </div>
    )
}