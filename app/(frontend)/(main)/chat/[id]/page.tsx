"use client";

import { Play, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Bumble from "@/app/component/bumble";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

export default function Chat() {
    const params = useParams();
    const router = useRouter();

    // Ambil ID daripada URL
    // Contoh: /chat/15 → conversationId = "15"
    const conversationId = params.id as string;

    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState<ChatMessage[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Ambil user ID
    useEffect(() => {
        const getId = async () => {
            try {
                const res = await fetch("/api/chat");
                const data = await res.json();

                if (!res.ok) {
                    return;
                }

                setUserId(data.user.id);
            } catch (error) {
                console.error("Failed to get user ID");
            }
        };

        getId();
    }, []);

   

    // Send message
    const handleSend = async () => {
        if (!message.trim()) return;

        if (!userId) {
            return alert("User ID not found!");
        }

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                    conversationId,
                    userId,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                return alert(data.message);
            }

            // Tambah user message
            setConversation((prev) => [
                ...prev,
                {
                    role: "user",
                    content: data.message.content,
                },
            ]);

            setMessage("");

            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }

            // Typing animation
            setIsTyping(true);

            setTimeout(() => {
                setIsTyping(false);

                setConversation((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content: data.assistanceMessage.content,
                    },
                ]);
            }, 2000);

        } catch (error) {
            console.error(error);
            alert("Server Problem, Please try again!");
        }
    };

    // Create new conversation
    const handleNew = async () => {
        if (!userId) {
            return alert("User ID not found!");
        }

        try {
            const res = await fetch("/api/conversation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                return alert(data.message);
            }

            // Pergi ke conversation baru
            router.push(`/chat/${data.conversation.id}`);

        } catch (error) {
            console.error(error);
            alert("Internal Problem, Please try again!");
        }
    };

    // Textarea auto resize
    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const textArea = e.target;

        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;

        setMessage(textArea.value);
    };

    return (
        <div className="h-screen bg-[#0F172A] flex justify-center items-center">

            <div className="relative bg-[#1E293B] w-[800px] h-[700px] rounded-xl shadow-[0_0_10px_#facc15] p-5">

                {/* Messages */}
                <div className="overflow-y-auto h-[600px] scrollbar-none">

                    {conversation.length > 0 ? (

                        <div className="flex flex-col w-full justify-end mb-10">

                            {conversation.map((msg, index) => (

                                <div
                                    key={index}
                                    className={
                                        msg.role === "user"
                                            ? "flex flex-row w-full justify-end mb-8"
                                            : "flex flex-row w-full justify-start mb-8"
                                    }
                                >

                                    <div
                                        className={
                                            msg.role === "user"
                                                ? "bg-[#facc15] p-2 rounded max-w-[70%]"
                                                : "bg-[#334155] p-2 rounded max-w-[70%]"
                                        }
                                    >

                                        <p className="text-white">
                                            {msg.content}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="flex flex-row w-full justify-center">

                            <p className="text-white text-[20px] font-semibold">
                                Please Ask your Ai assistance today.
                            </p>

                        </div>

                    )}

                    {/* Typing */}
                    {isTyping && (
                        <div>
                            <Bumble />
                        </div>
                    )}

                </div>


                {/* Input */}
                <div className="absolute w-full flex items-center bottom-[20px] justify-center">

                    <div className="w-[40em] outline outline-1 outline-offset-1 outline-yellow-400 focus-within:outline-2 focus-within:outline-offset-2 rounded-2xl flex flex-row justify-center items-center pl-[5px]">

                        {/* New Chat */}
                        <Plus
                            className="text-white m-2 shrink-0 self-end hover:bg-[#334155] rounded-xl cursor-pointer"
                            onClick={handleNew}
                        />

                        {/* Textarea */}
                        <textarea
                            className="scrollbar-none w-full max-h-[150px] outline-none border-none text-white resize-none overflow-y-auto break-words"
                            placeholder="Ask your AI assistant"
                            value={message}
                            onChange={handleChange}
                            rows={1}
                            ref={textareaRef}
                        />

                        {/* Send */}
                        <div className="w-[80px] flex justify-center shrink-0 self-end pb-1">

                            <button
                                className="bg-[#0F1724] rounded-2xl h-8 w-8 p-1 cursor-pointer shadow-[0_0_3px_#facc15]"
                                onClick={handleSend}
                            >

                                <Play className="text-yellow-300" />

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}