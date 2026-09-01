import { NextResponse, NextRequest} from "next/server";
import { prisma } from "@/app/lib/prisma";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export async function POST(request : NextRequest){
    try{
        const { conversationId, message, userId } = await request.json();

        if(!message){
            return NextResponse.json({
                success: false,
                message: "Message is required"
            },
        {status:400});
        }

        
        let conversation;

        //kalo conversation belum wujud
        if(!conversationId) {
            conversation = await prisma.conversation.create({
                data: {
                    //database akan simpan sampai 50 character sahaja
                    title: message.substring(0, 50),
                    userId: Number(userId),
                }
            });
        } else {
            conversation = await prisma.conversation.findUnique({
                where : {
                    id:conversationId,
                }
            })
        };

        if(!conversation) {
            return NextResponse.json({
                success: false,
                message : "Conversation not found"
            }, {
                status: 404
            })
        };

        //save user message
        const userMessage = await prisma.message.create({
            data : {
                role : "user",
                content : message,
                conversationId: conversation.id,
            }
        });

        //hantar message kepada Gemini
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents:message
        });

        //ambil aiMessage = response.text;
        const aiMessage = response.text;

        //save responseAi
        const assistanceMessage = await prisma.message.create({
            data:{
                role: "assistant",
                content: aiMessage ?? "",
                conversationId: conversation.id,
            }
        })


        return NextResponse.json({
            success: true,
            conversationId: conversation.id,
            message: userMessage,
            assistanceMessage
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

export async function GET(){
    try{
        const user = await prisma.user.findFirst({
            select: {
                id:true
            }
        });

         return NextResponse.json({
        success: true,
        user
    });
    }catch(error){
        console.log(error);
        return NextResponse.json({
            success : false,
            message: "Internal problem, Please try again",
        }, {
            status: 500
        })
    }
}