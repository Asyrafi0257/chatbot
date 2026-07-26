import { Metadata } from "next";
import React from "react";

export const metadata:Metadata = {
    title: "Login",
    description: "This page for user to login their account"
}

export default function LayoutLogin({children} : Readonly <{
    children : React.ReactNode,
}>){
    return (
        <div>
            {children}
        </div>
    )
}