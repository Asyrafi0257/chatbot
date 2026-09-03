"use client";

export default function Bumble() {
    return (
        <div className="flex gap-1 bg-gray-200 px-4 py-3 rounded-2xl w-fit">
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>
    )
}