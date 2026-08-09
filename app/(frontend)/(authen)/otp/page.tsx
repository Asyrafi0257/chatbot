"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";


function OTP(){
    //typescript type => nilai dibawah ada 2 nilai sahaja either string or null
    const [otpExpiry, setOtpExpiry] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    
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

    //function untuk setiap input
    const handleOtpChange = ( value : string, index : number) => {
        
        //only number
        if (!/^\d?$/.test(value)) {
        return;
        }
        const newOtp = [...otp];

        newOtp[index] = value;

        setOtp(newOtp);
    }

    //handle verify otp
    const handleVerify = async () => {
        try {
            if(!email) {
                return alert("email is missing!");
            }

            //combine otp
            const otpValue = otp.join("");

            //if otp length less than 6
            if(otp.length !== 6){
                return alert("Please enter complete OTP!");
            }

            const request = await fetch("/api/verify-otp", {
                method: "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    email : email,
                    otp : otpValue
                })
            });

            const data = await request.json();

            if(!request.ok){
                return alert(data.message);
            }

            return alert("OTP verified successfully!");

        }catch(error){
            console.log(error);
            alert("Internal server problem, Please try again!");
        }
    }

    const handleResend = async () => {
        if(!email) {
            return alert("Email is missing!");
        }

        try {
            const response = await fetch("/api/resend-otp", {
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    email : email
                })
            });

            const data = await response.json();

            if(!response.ok){
                return alert(data.message);
            }
             // Update expiry baru
            setOtpExpiry(
                data.otpExpiredAt
            );

            // Kosongkan OTP lama
            setOtp([
                "",
                "",
                "",
                "",
                "",
                "",
            ]);

            alert(
                "New OTP has been sent!"
            );
        } catch (error) {

        console.error(
            "Resend OTP error:",
            error
        );

        alert(
            "Internal server problem!"
        );
    }
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-[#0F1724]">
            <h2 className="text-white text-[30px] font-bold font-pixel tracking-[3px] uppercase">Enter OTP sent via <span className="text-yellow-500">Email</span> </h2>
            <p className="text-white tracking-[2px] font-pixel text-[18px]">We&apos;ve sent OTP to your email, Please check your email inbox.</p>

            <div className="mt-8 w-[500px] grid grid-cols-6 gap-5">
                <div className="outline otline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 h-[100px] w-[100px] flex flex-row justify-center items-center w-full rounded-md">
                    <input type="text" pattern="[0-9]*" maxLength={1} className="text-white h-full w-full border-none outline-none p-2 text-[40px] text-center" value={otp[0]} onChange={(e) => handleOtpChange(e.target.value, 0)}/>
                </div>

                <div className="outline otline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 h-[100px] w-[100px] flex flex-row justify-center items-center w-full rounded-md">
                    <input type="text" pattern="[0-9]*" maxLength={1} className="text-white h-full w-full border-none outline-none p-2 text-[40px] text-center" value={otp[1]} onChange={(e) => handleOtpChange(e.target.value, 1)}/>
                </div>

                <div className="outline otline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 h-[100px] w-[100px] flex flex-row justify-center items-center w-full rounded-md">
                    <input type="text" pattern="[0-9]*" maxLength={1} className="text-white h-full w-full border-none outline-none p-2 text-[40px] text-center" value={otp[2]} onChange={(e) => handleOtpChange(e.target.value, 2)} />
                </div>

                <div className="outline otline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 h-[100px] w-[100px] flex flex-row justify-center items-center w-full rounded-md">
                    <input type="text" pattern="[0-9]*" maxLength={1} className="text-white h-full w-full border-none outline-none p-2 text-[40px] text-center" value={otp[3]} onChange={(e) => handleOtpChange(e.target.value, 3)}/>
                </div>

                <div className="outline otline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 h-[100px] w-[100px] flex flex-row justify-center items-center w-full rounded-md">
                    <input type="text" pattern="[0-9]*" maxLength={1} className="text-white h-full w-full border-none outline-none p-2 text-[40px] text-center" value={otp[4]} onChange={(e) => handleOtpChange(e.target.value, 4)}/>
                </div>

               <div className="outline otline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 h-[100px] w-[100px] flex flex-row justify-center items-center w-full rounded-md">
                    <input type="text" pattern="[0-9]*" maxLength={1} className="text-white h-full w-full border-none outline-none p-2 text-[40px] text-center" value={otp[5]} onChange={(e) => handleOtpChange(e.target.value, 5)}/>
                </div>
            </div>

            <div className="flex flex-row w-full justify-center items-center mt-5">
                <p className="text-white">Didn&apos;t receive code? <span className="underline tracking-[2px] text-yellow-400 cursor-pointer" onClick={handleResend}>Resend</span> </p>
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
                <button className="w-[200px] h-[40px] p-2 bg-yellow-500 rounded-md text-white tracking-[2px] cursor-pointer" onClick={handleVerify}>Verify</button>
            </div>
        </div>
    )
}

//Suspence digunakan untuk menunggu sesuatu yang belum siap sebelum render component tersebut (senang cite => sementara nk tunggu benda tu siap kita tunjuk benda lain dulu)
// why nextjs kena buat mcm tu => sbb useSearchParams() ialah client hook yg bergantung kepada url sementara
//fallback tu adalah ui sementara
export default function OtpSuspence(){
    return (
        <Suspense fallback={
            <div>Loading OTP...</div>
        }>
            <OTP/>
        </Suspense>
    )
}