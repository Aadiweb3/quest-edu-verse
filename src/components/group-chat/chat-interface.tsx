
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isCurrentUser: boolean;
};

type GroupMember = {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
};

export function GroupChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Welcome to the Study Group! Ask questions and collaborate with peers.",
      sender: "System",
      timestamp: new Date(),
      isCurrentUser: false,
    },
  ]);
  
  const [input, setInput] = useState("");
  const [groupName, setGroupName] = useState("Web Development Study Group");
  const [members, setMembers] = useState<GroupMember[]>([
    { id: "1", name: "You", isOnline: true },
    { id: "2", name: "John Smith", avatar: "https://github.com/shadcn.png", isOnline: true },
    { id: "3", name: "Alice Johnson", isOnline: false },
    { id: "4", name: "Bob Brown", isOnline: true },
    { id: "5", name: "Emma Watson", isOnline: true },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "You",
      timestamp: new Date(),
      isCurrentUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate response after 1-3 seconds
    setTimeout(() => {
      const responses = [
        "That's a great question! I think we should look at the documentation.",
        "I worked on something similar last semester. Let me share my approach.",
        "Have you tried using a different method? The one you mentioned might be deprecated.",
        "Let's schedule a video call to discuss this in more detail.",
        "Here's a resource that might help: https://developer.mozilla.org/",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const randomMember = members.filter(m => m.id !== "1")[Math.floor(Math.random() * (members.length - 1))];
      
      const responseMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: randomMember.name,
        timestamp: new Date(),
        isCurrentUser: false,
      };
      
      setMessages((prev) => [...prev, responseMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = () => {
    toast({
      title: "File Upload",
      description: "File sharing will be implemented soon.",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-full mx-auto">
      {/* Group header */}
      <div className="border-b p-4 flex items-center justify-between bg-background/90 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-3">
            {members.slice(0, 3).map((member) => (
              <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className={member.isOnline ? "bg-green-100 text-green-800" : ""}>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {members.length > 3 && (
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                +{members.length - 3}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-lg">{groupName}</h3>
            <p className="text-xs text-muted-foreground">{members.filter(m => m.isOnline).length} online • {members.length} members</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Invite
        </Button>
      </div>

      {/* Chat area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Member list */}
        <div className="hidden md:block w-64 border-r overflow-auto">
          <div className="p-3">
            <Input placeholder="Search members..." className="h-8" />
          </div>
          <div className="p-2 pt-0">
            <p className="text-xs font-medium text-muted-foreground mb-1 px-2">ONLINE - {members.filter(m => m.isOnline).length}</p>
            {members.filter(m => m.isOnline).map(member => (
              <div key={member.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-green-100 text-green-800 text-xs">{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{member.name}</span>
                {member.id === "1" && <span className="text-xs text-muted-foreground ml-auto">(you)</span>}
              </div>
            ))}

            <p className="text-xs font-medium text-muted-foreground mt-4 mb-1 px-2">OFFLINE - {members.filter(m => !m.isOnline).length}</p>
            {members.filter(m => !m.isOnline).map(member => (
              <div key={member.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-xs opacity-50">{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Messages area */}
        <div className="flex flex-col flex-1">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.isCurrentUser ? "flex-row-reverse" : ""
                  }`}
                >
                  {!message.isCurrentUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={members.find(m => m.name === message.sender)?.avatar || ""} 
                        alt={message.sender}
                      />
                      <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col">
                    {!message.isCurrentUser && (
                      <span className="text-xs text-muted-foreground ml-1 mb-1">{message.sender}</span>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        message.isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 self-end">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" type="button" className="flex-shrink-0" onClick={handleFileUpload}>
                <Paperclip className="h-5 w-5" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Textarea
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-12 resize-none"
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="gradient-bg flex-shrink-0"
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
