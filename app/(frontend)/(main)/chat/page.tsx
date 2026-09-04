"use client";

import { Play, Plus } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import  Bumble  from "@/app/component/bumble";

type chatMessage = {
    role: "user" | "assistant";
    content: string;
}

export default function Chat(){
    const [message, setMessage] = useState("");
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [conversation, setConversation] = useState<chatMessage[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
            ]);            
            setMessage("");
            //nak buat size textarea back to normal size
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
            setIsTyping(true);

            setTimeout(() => {
                setIsTyping(false);

                setConversation((prev ) => [
                ...prev,
                 {
                    role: "assistant",
                    content: userMessage.assistanceMessage.content
                },
            ]); 
            }, 2000);

            return;

        }catch(error){
            console.log("Server Problem, Please try again");
            return alert("Server Problem, Please try again!");
        }
    }

    //function for handle input(TextArea)
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textArea = e.target;

        textArea.style.height = "auto",
        textArea.style.height = `${textArea.scrollHeight}px`

        setMessage(textArea.value);
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
                                <div key={index} className={ msg.role === "user" ? "flex flex-row w-full justify-end mb-8" : "flex flex-row w-full justify-start mb-8" } >
                                    
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
                     {/* dekat sini nak paparkan bumble message for ai response */}
                     {isTyping && (
                            <div>
                                <Bumble/>
                            </div>
                    )}    
                </div>

                {/* input for ask AI */}
                <div className="absolute w-full flex items-center bottom-[20px] justify-center">
                    <div className="w-[40em] outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 focus-whithin:outline-yellow-600 rounded-2xl flex flex-row justify-center items-center pl-[5px]">

                        <Plus  className="text-white m-2 shrink-0 self-end"/>
                        {/* Area for user input text */}
                        <textarea className="scrollbar-none w-full max-h-[150px] outline-none border-none text-white resize-none overflow-y-auto break-words" placeholder="Ask your AI assistant" value={message} onChange={handleChange} rows={1} ref={textareaRef}/>

                        {/* button submit */}
                        <div className="w-[80px] flex justify-center shrink-0 self-end pb-1">
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