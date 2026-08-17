import { Metadata } from "next";

export const metadata : Metadata = {
    title : "Chat",
    description : "This page used to user to interact with AI"
}

export default function LayoutChat({children} : Readonly <{
    children : React.ReactNode
}>) {
    return (
        <div>
            {children}
        </div>
    )
}