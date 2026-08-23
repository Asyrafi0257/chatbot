import { Metadata } from "next";

export const metadata: Metadata = {
    title :"Contact Us",
    description : "This page for user to contact if system had problem"
}

//Readonly => Typescript utility type (property dlm object dianggap tak boleh ubah);
export default function LayoutContact({children} : Readonly <{
    children : React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    )
}