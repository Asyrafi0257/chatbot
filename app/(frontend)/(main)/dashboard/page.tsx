"use client";

import { useRouter } from "next/navigation";

export default function Dashboard(){

    const router =  useRouter();

    const handleChat = () => {
        router.push("/chat");
    }

    const handleHistory = () => {
        router.push("/history-chat");
    }

    return (
        <div className="flex flex-col h-screen bg-[#0F172A] justify-center items-center">
            <h2 className="text-white text-[40px] font-bold font-pixel tracking-[3px]">Welcome back, <span className="text-yellow-500">Alif asyrafi</span></h2>
            <p className="text-gray-300 tracking-[2px] font-pixel text-[15px] text-center w-[700px]">You can use all these features inside this system to help you to solve your task, question and others. </p>

            <div className="flex flex-col mt-13 justify-center items-center w-full">
                <div className="flex flex-row bg-yellow-500 w-[300px] h-[40px] rounded-md cursor-pointer shadow-[0_0_8px_#facc15] items-center mb-5">
                    <button className="h-full w-full cursor-pointer text-white font-bold font-pixel tracking-[4px]" onClick={handleChat}>Chat</button>
                </div>

                <div className="flex flex-row bg-yellow-500 w-[300px] h-[40px] rounded-md cursor-pointer shadow-[0_0_8px_#facc15] items-center mb-5">
                    <button className="h-full w-full cursor-pointer text-white font-bold font-pixel tracking-[4px]" onClick={handleHistory}>History chat</button>
                </div>

                <div className="flex flex-row bg-yellow-500 w-[300px] h-[40px] rounded-md cursor-pointer shadow-[0_0_8px_#facc15] items-center mb-5">
                    <button className="h-full w-full cursor-pointer text-white font-bold font-pixel tracking-[4px]">Settings</button>
                </div>

                <div className="flex flex-row bg-yellow-500 w-[300px] h-[40px] rounded-md cursor-pointer shadow-[0_0_8px_#facc15] items-center mb-5">
                    <button className="h-full w-full cursor-pointer text-white font-bold font-pixel tracking-[4px]">Contact Us</button>
                </div>
            </div>
        </div>
    )
}