'use client';

import {MoveRight} from "lucide-react"
import { useRouter } from "next/navigation";

export default function LandPage(){
  const router = useRouter();

  const handleStart = () => {
    router.push("/login");
  }

  return (
    <div className="flex flex-row h-screen">
        <div className="bg-[#0F1724] w-full h-full flex flex-col items-center justify-center">
            <h2 className="font-pixel text-white font-bold text-[60px] tracking-[2px] typing-animation"> <span className="text-yellow-500 [text-shadow:0_0_10px_#facc15]">Welcome,</span> to your AI Assistance</h2>
            
            {/* nk buat text divider */}
            {/* shadow-[0_0_20px_#facc15] => 0 yang first tu horizontal offset, 0 second tu vertical offset then 20px tu blur radius*/}
            <div className="flex items-center my-4">
                <div className="flex-1 w-[400px] border-t-2 border-yellow-500 shadow-[0_0_20px_#facc15] "></div>
                 <span className="mx-4 text-gray-500 text-sm scale-150">🤖</span>
                 <div className="flex-1 w-[400px] border-t-2 border-yellow-500 shadow-[0_0_20px_#facc15]"></div>
            </div>

            <p className="font-pixel text-gray-300 tracking-[2px]"> Ask questions, explore ideas, solve problems, and get instant Ai powered assistance</p>

            <div className="flex flex-row p-2 mt-20 bg-yellow-500 shadow-[0_0_10px_#facc15] rounded-md font-pixel cursor-pointer">
              <button className="text-white mr-2 cursor-pointer text-[13px]" onClick={handleStart}> Let's explore</button>
              <MoveRight className="text-white cursor-pointer"/>
            </div>
        </div>
    </div>
  )
}