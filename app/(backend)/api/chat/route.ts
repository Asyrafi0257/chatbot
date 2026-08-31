import { NextResponse, NextRequest} from "next/server";

export async function POST(request : NextRequest){
    try{
        const {message} = await request.json();

        if(!message){
            return NextResponse.json({
                success: false,
                message: "Message is required"
            },
        {status:400});
        }

        return NextResponse.json({
            success:true,
            message: "Your message already send into database"
        }, {
            status:200
        })
    }catch(error){
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Internal server problem, Please try again"
        }, {
            status:500
        })
    }
}