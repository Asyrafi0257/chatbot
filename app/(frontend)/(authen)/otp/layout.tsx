import { Metadata } from "next";

export const metadata : Metadata = {
    title : "OTP",
    description : "This otp for verified user reset password"
}

export default function LayoutOTP({children} : Readonly <{
    children : React.ReactNode
}>) {
    return (
        <div>
            {children}
        </div>
    )
}