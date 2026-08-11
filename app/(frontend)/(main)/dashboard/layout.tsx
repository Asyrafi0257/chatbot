import { Metadata } from "next";

export const metadata : Metadata = {
    title : "Dashboard",
    description : "This dashboard has many feature to allow user to use"
}

export default function LayoutDashboard({children} : Readonly <{
    children : React.ReactNode
}>) {
    return (
        <div>
            {children}
        </div>
    )
}