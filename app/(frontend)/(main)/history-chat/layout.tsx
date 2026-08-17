import { Metadata } from "next";

export const metadata : Metadata = {
    title: "History chat",
    description : "This history chat used to help user to review back previous chat with AI"
}

export default function LayoutHistory({children} : Readonly <{
    children : React.ReactNode
}>) {
    return (
        <div>
            {children}
        </div>
    )
}