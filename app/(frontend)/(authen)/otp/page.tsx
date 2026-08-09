"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


export default function OTP(){
    //typescript type => nilai dibawah ada 2 nilai sahaja either string or null
    const [otpExpiry, setOtpExpiry] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(0);
    
    //kita nak ambil daripada url
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    //nak buat count down OTP expired
    useEffect( () => {

        if(!email) {
            console.log("Email is missing");
            return;
        }

        //*kita nak ambil data expiredOTP from database
        const getOtpExpiry = async () => {
            const response = await fetch(`/api/otp?email=${encodeURIComponent(email)}`)
            const dataOtp = await response.json();
            setOtpExpiry(dataOtp.otpExpiredAt);
        };
        
        getOtpExpiry();

    },[email]);

   //nak buat count down
   useEffect(() => {
        //if blm dapat expiry
        if(!otpExpiry){
            return;
        }

        const calculateTimeLeft = () => {

            //masa sekarang
            const now = Date.now();

            //expiry daripada database
            const expiry =  new Date(otpExpiry).getTime();

            //beza masa
            const difference = expiry - now;

            //if dh expired
            if(difference <= 0){
                setTimeLeft(0);
                return;
            }

            //miliseconds
            setTimeLeft(
                Math.ceil(difference / 1000)
            );
        };

        //calculate terus
        calculateTimeLeft()

        //update each 1 seconds
        const interval = setInterval( calculateTimeLeft, 100);

        //stop interval when component unmount
        return () => {
            clearInterval(interval);
        }
   }, [otpExpiry]);

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-[#0F1724]">
            <h2 className="text-white text-[30px] font-bold font-pixel tracking-[3px] uppercase">Enter OTP sent via <span className="text-yellow-500">Email</span> </h2>
            <p className="text-white tracking-[2px] font-pixel text-[18px]">We&apos;ve sent OTP to your email, Please check your email inbox.</p>

            <div className="mt-8 w-[500px] grid grid-cols-6 gap-5">
                <div className="outline otline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 h-[100px] w-[100px] flex flex-row justify-center items-center w-full rounded-md">
                    <input type="text" pattern="[0-9]*" maxLength={1} className="text-white h-full w-full border-none outline-none p-2 text-[40px] text-center" />
                </div>

                <div className="outline otline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 h-[100px] w-[100px] flex flex-row justify-center items-center w-full rounded-md">
                    <input type="text" pattern="[0-9]*" maxLength={1} className="text-white h-full w-full border-none outline-none p-2 text-[40px] text-center" />
                </div>

                <div className="outline otline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 h-[100px] w-[100px] flex flex-row justify-center items-center w-full rounded-md">
                    <input type="text" pattern="[0-9]*" maxLength={1} className="text-white h-full w-full border-none outline-none p-2 text-[40px] text-center" />
                </div>

                <div className="outline otline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 h-[100px] w-[100px] flex flex-row justify-center items-center w-full rounded-md">
                    <input type="text" pattern="[0-9]*" maxLength={1} className="text-white h-full w-full border-none outline-none p-2 text-[40px] text-center" />
                </div>

                <div className="outline otline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 h-[100px] w-[100px] flex flex-row justify-center items-center w-full rounded-md">
                    <input type="text" pattern="[0-9]*" maxLength={1} className="text-white h-full w-full border-none outline-none p-2 text-[40px] text-center" />
                </div>

               <div className="outline otline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 h-[100px] w-[100px] flex flex-row justify-center items-center w-full rounded-md">
                    <input type="text" pattern="[0-9]*" maxLength={1} className="text-white h-full w-full border-none outline-none p-2 text-[40px] text-center" />
                </div>
            </div>

            <div className="flex flex-row w-full justify-center items-center mt-5">
                <p className="text-white">Didn&apos;t receive code? <span className="underline tracking-[2px] text-yellow-400 cursor-pointer">Resend</span> </p>
                <div className="ml-3">
                    {timeLeft > 0 ? (
                        <p className="text-white">
                            - OTP expires in{" "}
                            <span className="text-yellow-400">
                            {minutes}:
                            {seconds
                            .toString()
                            .padStart(
                                2,
                                "0"
                            )}
                            </span>
                        </p>
                    ) : (
                        <p className="text-red-500">
                        OTP expired
                        </p>
                    )}
                    </div>
            </div>

            <div className="flex flex-row w-full justify-center mt-5">
                <button className="w-[200px] h-[40px] p-2 bg-yellow-500 rounded-md text-white tracking-[2px] cursor-pointer">Verify</button>
            </div>
        </div>
    )
}