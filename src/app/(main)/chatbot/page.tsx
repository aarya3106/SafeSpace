import { ChatInterface } from "@/components/chatbot/chat-interface";

export default function ChatbotPage() {
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="mb-6 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight font-headline">AI Chat</h1>
                <p className="text-muted-foreground">
                    Talk about what's on your mind. Our AI is here to listen without judgment.
                </p>
            </div>
            <ChatInterface />
        </div>
    );
}
