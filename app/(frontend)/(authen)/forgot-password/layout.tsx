import { Metadata } from "next";

export const metadata : Metadata = {
    title : "Forgot Password",
    description : "This page allow user to forgot password when they not rememeber their password"
}

export default function LayoutForgot({children} : Readonly <{children : React.ReactNode}>){
    return (
        <div>
            {children}
        </div>
    )
}