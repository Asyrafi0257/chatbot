"use client";

import {User, UserRoundPen, Mail, Phone, Lock, LockKeyhole, ArrowRight, Eye, EyeOff} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register(){
    const [showPassword, setShowPassword] = useState(false);
    const [fullname, setFullName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handlePassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSignIn = () => {
        router.push("/login");
    }

    const handleRegister = async() => {

        // check password match with confirm password or not
        if(password !== confirmPassword) return alert("Your password not match with confirm password");

        try{
            const userRequest = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    fullname,
                    username,
                    email,
                    phone,
                    password,
                    confirmPassword
                })
            });

            const data = await userRequest.json();

            //check if ada error
            if(!userRequest.ok) {
                return alert(data.message);
            }
            setFullName("");
            setUserName("");
            setEmail("");
            setPhone("")
            setPassword("");
            setConfirmPassword("");
            return alert("Register successfully");

        } catch(error){
            console.log(error);
            alert("Server problem, Please try again!");
        }
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-[#0F1724] ">
                <h2 className="text-white text-[40px] font-pixel font-bold tracking-[3px]">Let&apos;s Get <span className="text-yellow-500">Started!</span></h2>
                <p className="text-white text-[15px] font-pixel tracking-[2px] text-center w-[550px] mt-3">create your account and treat yourself to a meal at the restaurant you love. Sign Up now</p>

                <div className="mt-7 w-[700px] h-[430px] bg-[#1E293B] rounded-xl p-2 flex flex-col items-center shadow-[0_0_15px_#facc15]">
                    <h2 className="text-white text-[30px] font-bold font-pixel tracking-[2px] uppercase">Register</h2>

                    {/* input for fullname and username */}
                    <div className="grid grid-cols-2 gap-3 w-full">
                        <div className="mt-5 w-full flex flex-col items-start p-2">
                            <label className="text-white tracking-[3px] uppercase font-bold ml-5 font-pixel">Full Name</label>
                            <div className="outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 rounded-md w-[300px] h-[33px] ml-5 mt-2 flex flex-row items-center">
                                <User className="text-gray-300 bg-yellow-500 rounded-l-md h-[33px] w-[50px] outline outline-2 outline-yellow-500 p-1"/>
                                <input type="text" placeholder="Full Name" className="text-gray-300 w-full h-full p-2 outline-none border-none text-[15px]"
                                value={fullname}
                                onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-5 w-full flex flex-col items-start p-2">
                            <label className="text-white tracking-[3px] uppercase font-bold font-pixel">Username</label>
                            <div className="outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 rounded-md w-[300px] h-[33px] mt-2 flex flex-row items-center">
                                <UserRoundPen className="text-gray-300 bg-yellow-500 rounded-l-md h-[33px] w-[50px] outline outline-2 outline-yellow-500 p-1"/>
                                <input type="text" placeholder="User Name" className="text-gray-300 w-full h-full p-2 outline-none border-none text-[15px]"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* email and no.phone*/}
                    <div className="grid grid-cols-2 gap-3 w-full">
                        <div className="mt-3 w-full flex flex-col items-start p-2">
                            <label className="text-white tracking-[3px] uppercase font-bold ml-5 font-pixel">Email</label>
                            <div className="outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 rounded-md w-[300px] h-[33px] ml-5 mt-2 flex flex-row items-center">
                                <Mail className="text-gray-300 bg-yellow-500 rounded-l-md h-[33px] w-[50px] outline outline-2 outline-yellow-500 p-1"/>
                                <input type="email" placeholder="Email" className="text-gray-300 w-full h-full p-2 outline-none border-none text-[15px]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-3 w-full flex flex-col items-start p-2">
                            <label className="text-white tracking-[3px] uppercase font-bold font-pixel">Phone Number</label>
                            <div className="outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 rounded-md w-[300px] h-[33px] mt-2 flex flex-row items-center">
                                <Phone className="text-gray-300 bg-yellow-500 rounded-l-md h-[33px] w-[50px] outline outline-2 outline-yellow-500 p-1"/>
                                <input type="text" placeholder="Phone Number" className="text-gray-300 w-full h-full p-2 outline-none border-none text-[15px]"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* password and confirm password*/}
                    <div className="grid grid-cols-2 gap-3 w-full">
                        <div className="mt-3 w-full flex flex-col items-start p-2">
                            <label className="text-white tracking-[3px] uppercase font-bold ml-5 font-pixel">Password</label>
                            <div className="outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 rounded-md w-[300px] h-[33px] ml-5 mt-2 flex flex-row items-center">
                                <Lock className="text-gray-300 bg-yellow-500 rounded-l-md h-[33px] w-[50px] outline outline-2 outline-yellow-500 p-1"/>
                                <input type={showPassword ? "text" : "password"} placeholder="Password" className="text-gray-300 w-full h-full p-2 outline-none border-none text-[15px]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                                <button onClick={handlePassword} className="cursor-pointer">
                                    {showPassword ? (
                                    <Eye className="text-gray-300 mr-2"/>
                                ) : (
                                    <EyeOff className="text-gray-300 mr-2"/>
                                )}
                                </button>
                            </div>
                        </div>
                        <div className="mt-3 w-full flex flex-col items-start p-2">
                            <label className="text-white tracking-[3px] uppercase font-bold font-pixel">Confirm Password</label>
                            <div className="outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-500 rounded-md w-[300px] h-[33px] mt-2 flex flex-row items-center">
                                <LockKeyhole className="text-gray-300 bg-yellow-500 rounded-l-md h-[33px] w-[50px] outline outline-2 outline-yellow-500 p-1"/>
                                <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" className="text-gray-300 w-full h-full p-2 outline-none border-none text-[15px]"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button onClick={handlePassword} className="cursor-pointer">
                                    {showPassword ? (
                                    <Eye className="text-gray-300 mr-2"/>
                                ) : (
                                    <EyeOff className="text-gray-300 mr-2"/>
                                )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* button */}
                        <div className="grid grid-cols-1 mt-3 items-center mt-6">
                            <div className="flex flex-row w-full">
                                <div className="h-[30px] w-[110px] bg-yellow-500 flex flex-row items-center p-2 rounded-md shadow-[0_0_5px_#facc15] cursor-pointer mr-5">
                                    <button 
                                    className="w-full text-white cursor-pointer mr-2 font-pixel"
                                    onClick={handleRegister}
                                    >Register</button>
                                    <ArrowRight className="text-white cursor-pointer"/>
                                </div>

                                <div className="h-[30px] w-[110px] bg-yellow-500 flex flex-row items-center p-2 rounded-md shadow-[0_0_5px_#facc15] cursor-pointer">
                                    <button className="w-full text-white cursor-pointer mr-2 font-pixel" onClick={handleSignIn}>Sign In</button>
                                    <ArrowRight className="text-white cursor-pointer"/>
                                </div>
                            </div>
                        </div>

                </div>  
        </div>
    )
}