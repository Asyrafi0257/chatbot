import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
    description: "This page is for user to register their account"
}

export default function LayoutRegister({children} : Readonly <{
    children: React.ReactNode
}>) {
    return (
        <div>
            {children}
        </div>
    )
}