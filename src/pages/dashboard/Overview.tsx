
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Star, MessageSquare, Book } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const studyTimeData = [
  { day: "Mon", hours: 1.5 },
  { day: "Tue", hours: 2.3 },
  { day: "Wed", hours: 0.8 },
  { day: "Thu", hours: 2.5 },
  { day: "Fri", hours: 1.7 },
  { day: "Sat", hours: 3.2 },
  { day: "Sun", hours: 2.1 },
];

const subjectProgressData = [
  { subject: "Math", completed: 68 },
  { subject: "Science", completed: 45 },
  { subject: "History", completed: 92 },
  { subject: "Language", completed: 78 },
];

const performanceData = [
  { name: "Quizzes", score: 76 },
  { name: "Assignments", score: 84 },
  { name: "Projects", score: 92 },
  { name: "Participation", score: 88 },
];

const Overview = () => {
  return (
    <div>
      <div className="flex items-start gap-4 flex-col sm:flex-row sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your learning journey.
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-tech-purple-light/20 to-tech-blue/20 border-tech-purple-light/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" /> 
              AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">Got questions? Ask our AI tutor for help.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <a href="/dashboard/ai-chatbox">Chat Now <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-tech-soft-purple/40 to-tech-purple-light/20 border-tech-soft-purple/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star className="h-5 w-5 mr-2" /> 
              Learning Games
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">Challenge yourself with our interactive quizzes.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <a href="/dashboard/learning-games">Play Now <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-tech-soft-pink/40 to-tech-purple-light/20 border-tech-soft-pink/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2" /> 
              Study Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">Check your personalized learning schedule.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <a href="/dashboard/study-plan">View Plan <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-tech-blue/20 to-tech-soft-purple/30 border-tech-blue/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Book className="h-5 w-5 mr-2" /> 
              Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">Browse our library of learning materials.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <a href="/dashboard/resources">Explore <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Study Time</CardTitle>
            <CardDescription>Hours spent learning per day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studyTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hours" name="Hours Studied" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Breakdown</CardTitle>
            <CardDescription>Your scores by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#9b87f5"
                    paddingAngle={5}
                    dataKey="score"
                    nameKey="name"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Progress</CardTitle>
          <CardDescription>Track your completion across different subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subjectProgressData.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{subject.subject}</span>
                  <span>{subject.completed}%</span>
                </div>
                <Progress value={subject.completed} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
