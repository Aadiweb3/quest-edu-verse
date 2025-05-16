
import { ChatInterface } from "@/components/ai-chatbox/chat-interface";
import { Card } from "@/components/ui/card";

const AIChatbox = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col pb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-1">AI Doubt Solver</h1>
        <p className="text-muted-foreground">
          Ask any question about your studies and get instant help.
        </p>
      </div>
      
      <div className="h-[calc(100%-80px)]">
        <Card className="bg-card h-full border">
          <ChatInterface />
        </Card>
      </div>
    </div>
  );
};

export default AIChatbox;
