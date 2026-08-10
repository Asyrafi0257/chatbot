"use client";

import { LockKeyhole, LockKeyholeIcon } from "lucide-react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";


function ResetPassword(){

    //kita nak ambil daripada url
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

    const handleReset = async () => {
        try{
            if(!password || !confirmPassword){
                return alert("Please fill all the fields");
            }

            const response = await fetch("/api/reset-password", {
                method: "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    email : email,
                    password,
                    confirmPassword
                })
            });

            const data = await response.json();

            if(!response.ok){
                return alert(data.message);
            }

            setPassword("");
            setConfirmPassword("");
            
            router.push("/login");
            return alert("Your Password successfully reset");

        }catch(error){
            console.log(error);
            return alert("Server problem, Please try again!");
        }
    }

    return (
        <div className="flex flex-row h-screen bg-[#0F1724] justify-center items-center">
            <div className="bg-[#1E293B] w-[500px] h-[350px] rounded-md shadow-[0_0_15px_#facc15] p-2 flex flex-col items-center">
                <h2 className="font-pixel font-bold tracking-[3px] text-white text-[30px]">Reset your <span className="text-yellow-500">Password</span></h2>
                <p className="text-[13px] tracking-[3px] text-white font-pixel">Enter your new password and you&apos;re all set.</p>

                <div className="flex flex-col justify-center items-center mt-5 ">
                    <label className="text-[15px] tracking-[2px] text-white w-[400px]">New Password</label>
                    <div className="outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 w-[400px] mt-2 rounded-sm h-[30px] flex flex-row items-center justify-center">
                        <LockKeyhole className="w-[40px] h-full p-1 bg-yellow-500 text-gray-200 rounded-l-sm outline outline-2 outline-yellow-500"/>
                        <input type="text" className="w-full border-none outline-none p-2 text-gray-300" placeholder="Your New Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                 <div className="flex flex-col justify-center items-center mt-5 ">
                    <label className="text-[15px] tracking-[2px] text-white w-[400px]">Confirm New Password</label>
                    <div className="outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 w-[400px] mt-2 rounded-sm h-[30px] flex flex-row items-center justify-center">
                        <LockKeyholeIcon className="w-[40px] h-full p-1 bg-yellow-500 text-gray-200 rounded-l-sm outline outline-2 outline-yellow-500"/>
                        <input type="text" className="w-full border-none outline-none p-2 text-gray-300" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                </div>

                <div className="w-full mt-10 flex flex-row justify-center items-center">
                    <button className="text-white bg-yellow-500 p-1 rounded-md w-54 tracking-[1px] cursor-pointer" onClick={handleReset}>Reset Password</button>
                </div>
            </div>
        </div>
    )
}

//Suspence digunakan untuk menunggu sesuatu yang belum siap sebelum render component tersebut (senang cite => sementara nk tunggu benda tu siap kita tunjuk benda lain dulu)
// why nextjs kena buat mcm tu => sbb useSearchParams() ialah client hook yg bergantung kepada url sementara
//fallback tu adalah ui sementara
export default function resetSuspence(){
    return (
        <Suspense fallback={
            <div>Loading OTP...</div>
        }>
            <ResetPassword/>
        </Suspense>
    )
}