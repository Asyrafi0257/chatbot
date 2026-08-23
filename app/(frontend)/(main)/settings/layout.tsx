import { Metadata } from "next";

export const  metadata : Metadata = {
    title : "Setting",
    description : "This page for user to setting their dashboard or syetem"
}

export default function LayoutSetting({children} : Readonly <{
    children : React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    )
}