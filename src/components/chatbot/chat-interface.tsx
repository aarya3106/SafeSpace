'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { chatbotPersonalizedRecommendations } from '@/ai/flows/chatbot-personalized-recommendations';
import { UrgentHelpModal } from '../shared/urgent-help-modal';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hi there! I'm SafeSpace's AI assistant. What's on your mind today? Feel free to share as much or as little as you like." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCrisisModalOpen, setCrisisModalOpen] = useState(false);

  const { toast } = useToast();

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Crisis keyword detection
    const crisisKeywords = ["kill myself", "end my life", "want to die", "hurt myself", "suicidal", "can't go on"];
    const isCrisis = crisisKeywords.some(keyword => input.toLowerCase().includes(keyword));

    if (isCrisis) {
        const botMessage: Message = { sender: 'bot', text: "It sounds like you are going through a lot right now, and I'm really concerned. It's important to talk to someone who can help immediately." };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        setCrisisModalOpen(true);
        return;
    }
    
    try {
        const result = await chatbotPersonalizedRecommendations({
            userId: 'anonymous-user',
            recentJournalEntries: [input],
            trackerData: 'User is feeling stressed',
        });

        const botMessage: Message = { sender: 'bot', text: result.recommendationText };
        setMessages(prev => [...prev, botMessage]);

        if (result.suggestedAction === 'book_counsellor') {
            toast({
                title: 'A suggestion for you',
                description: 'It might be helpful to talk to a counsellor. You can book a session anytime.',
            })
        }

    } catch (error) {
        console.error("AI chat failed:", error);
        toast({
            variant: "destructive",
            title: "AI Error",
            description: "Sorry, I'm having trouble connecting right now. Please try again later.",
        });
        const errorMessage: Message = { sender: 'bot', text: "I'm having a little trouble thinking right now. Could you try again in a moment?" };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex flex-row items-center">
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium leading-none">SafeSpace AI</p>
                    <p className="text-sm text-muted-foreground">Always here to listen</p>
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full w-full p-4 md:p-6">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                  {message.sender === 'bot' && (
                     <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot/></AvatarFallback>
                     </Avatar>
                  )}
                  <div className={`rounded-lg p-3 max-w-xs md:max-w-md ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                   {message.sender === 'user' && (
                     <Avatar className="h-8 w-8">
                        <AvatarFallback><User /></AvatarFallback>
                     </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                  <div className="flex items-start gap-4">
                     <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot/></AvatarFallback>
                     </Avatar>
                     <div className="rounded-lg p-3 max-w-xs bg-muted flex items-center gap-2">
                        <Sparkles className="h-4 w-4 animate-spin text-muted-foreground"/>
                        <p className="text-sm text-muted-foreground">Thinking...</p>
                     </div>
                  </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      <UrgentHelpModal isOpen={isCrisisModalOpen} onOpenChange={setCrisisModalOpen} />
    </>
  );
}
