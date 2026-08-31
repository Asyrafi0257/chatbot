"use client";

import { Play } from "lucide-react";
import { useState } from "react";

export default function Chat(){
    const [message, setMessage] = useState("");

    const handleSend = () => {

    }

    return (
        <div className="h-screen bg-[#0F172A] flex justify-center items-center">
            <div className="relative bg-[#1E293B] w-[800px] h-[700px] rounded-xl shadow-[0_0_10px_#facc15] p-5">

                {/* tempat message muncul */}
                <div>

                </div>

                {/* input for ask AI */}
                <div className="absolute w-full flex items-center bottom-[20px] justify-center">
                    <div className="w-[40em] h-[38px] outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-whithin:outline-yellow-600 rounded-2xl flex flex-row justify-center items-center pl-[5px]">
                        {/* Area for user input text */}
                        <textarea className="w-full h-full outline-none border-none text-white resize-none overflow-y-auto break-words p-[3px]" placeholder="Ask your AI assistance"/>

                        {/* button submit */}
                        <div className="w-[80px] flex items-center justify-center">
                            <button className="bg-[#0F1724] rounded-2xl h-8 w-8 p-1 cursor-pointer shadow-[0_0_3px_#facc15]" onClick={handleSend}>
                                <Play className="text-yellow-300"/>
                            </button>
                            
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}