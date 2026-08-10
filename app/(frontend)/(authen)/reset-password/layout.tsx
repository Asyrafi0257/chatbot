import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Reset Password",
    description : "This page allow user to reset their password when user not remember their password."
}

export default function LayoutReset({children} : Readonly <{
    children : React.ReactNode
}>){
    return (
        <div>
            {children}
        </div>
    )
}