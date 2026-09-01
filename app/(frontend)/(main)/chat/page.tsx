"use client";

import { Play } from "lucide-react";
import { useEffect, useState } from "react";

type chatMessage = {
    role: "user" | "assistant";
    content: string;
}

export default function Chat(){
    const [message, setMessage] = useState("");
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [conversation, setConversation] = useState<chatMessage[]>([]);
    const [userId, setUserId] = useState<number | null>(null);



    useEffect(() => {
        const getId = async () => {
            const res = await fetch("/api/chat");
            const data = await res.json();
            setUserId(data.user.id);
        };
        getId();
    }, [userId]);

    const handleSend = async () => {
        try{   
            const res = await fetch("/api/chat", {
                method:"POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    message,
                    conversationId,
                    userId
                })
            });

            const userMessage = await res.json();

            if(!res.ok){
                return alert(userMessage.message);
            }

            if (!conversationId) {
            setConversationId(userMessage.conversationId);
}
            setConversation((prev ) => [
                ...prev,
                 {
                    role: "user",
                    content: userMessage.message.content
                },
                {
                    role: "assistant",
                    content: userMessage.assistanceMessage.content
                }
            ]);

            
            setMessage("");

            return;

        }catch(error){
            console.log("Server Problem, Please try again");
            return alert("Server Problem, Please try again!");
        }
    }

    return (
        <div className="h-screen bg-[#0F172A] flex justify-center items-center">
            <div className="relative bg-[#1E293B] w-[800px] h-[700px] rounded-xl shadow-[0_0_10px_#facc15] p-5">

                {/* tempat message muncul */}
                <div className="overflow-y-auto h-[600px] scrollbar-none">
                    {/* sini message user - belah kanan */}
                     {conversation.length > 0 ? (
                        <div className="flex flex-col w-full justify-end mb-10">
                            {conversation.map((msg, index) => (
                                <div key={index} className={ msg.role === "user" ? "flex flex-row w-full justify-end" : "flex flex-row w-full justify-start" } >
                                    <div className={ msg.role === "user" ? "bg-[#facc15] p-2 rounded max-w-[70%]" : "bg-[#334155] p-2 rounded max-w-[70%]" } >
                                        <p className="text-white"> {msg.content} </p>
                                    </div>
                                </div>
                            ))}
                            </div>
                        ) : (
                             <div className="flex flex-row w-full justify-center">
                                <p className="text-white text-[20px] font-semibold">Please Ask your Ai assistance today.</p>
                            </div>
                        )} 
                    
                        
                </div>

                {/* input for ask AI */}
                <div className="absolute w-full flex items-center bottom-[20px] justify-center">
                    <div className="w-[40em] h-[38px] outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-whithin:outline-yellow-600 rounded-2xl flex flex-row justify-center items-center pl-[5px]">

                        {/* Area for user input text */}
                        <textarea className="w-full h-full outline-none border-none text-white resize-none overflow-y-auto break-words p-[3px]" placeholder="Ask your AI assistance" value={message} onChange={(e) => setMessage(e.target.value)}/>

                        {/* button submit */}
                        <div className="w-[80px] flex items-center justify-center">
                            <button className="bg-[#0F1724] rounded-2xl h-8 w-8 p-1 cursor-pointer shadow-[0_0_3px_#facc15]" onClick={handleSend}>
                                <Play className="text-yellow-300"/>
                            </button>
                            
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}