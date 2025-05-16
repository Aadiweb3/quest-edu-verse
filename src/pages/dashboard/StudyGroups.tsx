
import { Card } from "@/components/ui/card";
import { GroupChatInterface } from "@/components/group-chat/chat-interface";

const StudyGroups = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col pb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Study Groups</h1>
        <p className="text-muted-foreground">
          Collaborate with other students in real-time
        </p>
      </div>
      
      <div className="h-[calc(100%-80px)]">
        <Card className="bg-card h-full border">
          <GroupChatInterface />
        </Card>
      </div>
    </div>
  );
};

export default StudyGroups;
