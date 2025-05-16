
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Image, Database } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  isTyping?: boolean;
};

// API key for Google's Generative AI
const API_KEY = "AIzaSyDgKRhoi7bj65WmgXw8JGwNCRqYfG57uAM";

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
  const { toast } = useToast();

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

    try {
      // Prepare conversation history for context
      const conversationHistory = messages
        .filter(msg => !msg.isTyping)
        .slice(-5) // Last 5 messages for context
        .map(msg => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        }));
      
      // Make API request to Google's Generative AI with improved prompt
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            contents: [
              {
                role: "system",
                parts: [
                  {
                    text: "You are an educational AI assistant called E-Tech AI. You help students with their academic questions in a friendly, informative, and encouraging manner. Your goal is to provide clear explanations and useful information to help students learn."
                  }
                ]
              },
              // Include conversation history for context
              ...conversationHistory,
              {
                role: "user",
                parts: [{ text: input }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug log to see the full response
      
      let aiResponse = "I'm sorry, I couldn't generate a response. Please try again.";
      
      if (data.candidates && 
          data.candidates[0]?.content?.parts && 
          data.candidates[0].content.parts.length > 0 && 
          data.candidates[0].content.parts[0]?.text) {
        aiResponse = data.candidates[0].content.parts[0].text;
      } else if (data.promptFeedback && data.promptFeedback.blockReason) {
        // Handle content policy blocks
        aiResponse = `I'm sorry, I can't provide an answer to that question. (Reason: ${data.promptFeedback.blockReason})`;
      }

      // Remove typing indicator
      setMessages((prev) => prev.filter((message) => message.id !== typingId));

      // Add AI response
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        timestamp: new Date(),
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling AI API:", error);
      
      // Remove typing indicator
      setMessages((prev) => prev.filter((message) => message.id !== typingId));
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I encountered an error. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      // Show toast notification with more details
      toast({
        title: "API Error",
        description: `Failed to connect to AI service: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }
}
