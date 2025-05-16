
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Image, Database } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  isTyping?: boolean;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your E-Tech AI Assistant. How can I help with your studies today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add typing indicator
    const typingId = `typing-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: typingId,
        content: "",
        sender: "ai",
        timestamp: new Date(),
        isTyping: true,
      },
    ]);

    // Simulate AI response delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.filter((message) => message.id !== typingId)
      );

      // Generate mock response based on input
      let response = "I don't know how to answer that yet.";
      
      if (input.toLowerCase().includes("math") || input.toLowerCase().includes("equation")) {
        response = "For math problems, it's helpful to break them down into steps. Let's work through this equation one step at a time. What specific part are you struggling with?";
      } else if (input.toLowerCase().includes("history") || input.toLowerCase().includes("date")) {
        response = "Historical events are easier to remember when you connect them to a timeline or story. Would you like me to explain this period in more detail or create a simple timeline for you?";
      } else if (input.toLowerCase().includes("science") || input.toLowerCase().includes("biology")) {
        response = "That's an interesting science question! To understand this concept better, we can think of it as a system with interconnected parts. Would you like me to generate a diagram to visualize this?";
      } else if (input.toLowerCase().includes("hello") || input.toLowerCase().includes("hi")) {
        response = "Hello! I'm your AI learning assistant. I can help with subject questions, explain concepts, generate study materials, or just chat about your educational goals. What would you like to explore today?";
      } else if (input.toLowerCase().includes("help") || input.toLowerCase().includes("can you")) {
        response = "I'd be happy to help! I can answer questions about academic subjects, explain difficult concepts, help you prepare for tests, or create personalized study materials. What specific help do you need today?";
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-3 max-w-[80%] ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="AI" />
                  <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                </Avatar>
              )}
              {message.sender === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-4 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.isTyping ? (
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-current rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                    <div className="h-2 w-2 bg-current rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 bg-current rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{message.content}</div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" type="button" className="flex-shrink-0">
            <Image className="h-5 w-5" />
            <span className="sr-only">Attach image</span>
          </Button>
          <Button variant="outline" size="icon" type="button" className="flex-shrink-0">
            <Database className="h-5 w-5" />
            <span className="sr-only">Examples</span>
          </Button>
          <Textarea
            placeholder="Ask anything about your studies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-12 resize-none"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="gradient-bg flex-shrink-0"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
        <div className="mt-2 text-center text-sm text-muted-foreground">
          <p>
            Tip: Ask specific questions and try "Explain with examples" for better results.
          </p>
        </div>
      </div>
    </div>
  );
}
