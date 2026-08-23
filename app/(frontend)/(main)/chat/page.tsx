"use client";

export default function Chat(){
    return (
        <div className="h-screen bg-[#0F172A] flex justify-center items-center">
            <div className="relative bg-[#1E293B] w-[800px] h-[700px] rounded-xl shadow-[0_0_10px_#facc15] p-5">

                {/* input for ask AI */}
                <div className="absolute w-full flex items-center bottom-[20px] justify-center">
                    <div className="w-[40em] h-[2em] outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-whithin:outline-yellow-600 rounded-2xl flex items-center pl-[2px]">
                        <textarea className="w-full h-full outline-none border-none text-white resize-none overflow-y-auto break-words p-[3px]" placeholder="Ask your AI assistance"/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}