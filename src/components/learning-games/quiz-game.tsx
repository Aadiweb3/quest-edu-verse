
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, Trophy } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "math" | "science" | "history" | "language";
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the value of π (pi) to two decimal places?",
    options: ["3.14", "3.16", "3.12", "3.18"],
    correctAnswer: 0,
    explanation: "Pi (π) is approximately equal to 3.14159..., so rounded to two decimal places it's 3.14.",
    category: "math"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Mercury"],
    correctAnswer: 2,
    explanation: "Mars is known as the Red Planet due to the reddish appearance of its surface caused by iron oxide (rust).",
    category: "science"
  },
  {
    id: 3,
    question: "In which year did World War II end?",
    options: ["1943", "1945", "1947", "1950"],
    correctAnswer: 1,
    explanation: "World War II ended in 1945 with the surrender of Japan after the United States dropped atomic bombs on Hiroshima and Nagasaki.",
    category: "history"
  },
  {
    id: 4,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gl", "Au", "Ag"],
    correctAnswer: 2,
    explanation: "The chemical symbol for gold is Au, derived from its Latin name 'aurum'.",
    category: "science"
  },
  {
    id: 5,
    question: "What is the past tense of 'seek'?",
    options: ["Seeked", "Sought", "Seed", "Seek"],
    correctAnswer: 1,
    explanation: "'Sought' is the past tense of 'seek'. It's an irregular verb that doesn't follow the standard -ed pattern.",
    category: "language"
  }
];

export function QuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizEnded, setQuizEnded] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Reset timer when moving to a new question
  useEffect(() => {
    if (quizEnded) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!showExplanation && selectedOption === null) {
            handleTimeout();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, showExplanation, selectedOption, quizEnded]);

  const handleTimeout = () => {
    toast("Time's up!", {
      description: "You ran out of time for this question.",
      icon: <Clock className="h-4 w-4" />,
    });
    setIsCorrect(false);
    setShowExplanation(true);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (showExplanation || selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    const correct = optionIndex === sampleQuestions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore((prev) => prev + 1);
      toast("Correct answer!", {
        description: "Well done! You've earned points.",
        icon: <CheckCircle2 className="text-green-500 h-4 w-4" />,
      });
    } else {
      toast("Incorrect answer", {
        description: "Review the explanation to learn more.",
        icon: <XCircle className="text-red-500 h-4 w-4" />,
      });
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setTimeLeft(30);
      setIsCorrect(null);
    } else {
      setQuizEnded(true);
      toast("Quiz completed!", {
        description: `Your final score is ${score} out of ${sampleQuestions.length}`,
        icon: <Trophy className="text-tech-purple h-4 w-4" />,
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
    setTimeLeft(30);
    setQuizEnded(false);
    setIsCorrect(null);
  };

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;
  const currentQ = sampleQuestions[currentQuestion];

  const categoryColors = {
    math: "bg-blue-500",
    science: "bg-green-500",
    history: "bg-amber-500",
    language: "bg-purple-500"
  };

  return (
    <div className="container mx-auto max-w-3xl py-6">
      {!quizEnded ? (
        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <Badge variant="outline" className="text-xs font-medium">
                Question {currentQuestion + 1}/{sampleQuestions.length}
              </Badge>
              <Badge 
                className={`${categoryColors[currentQ.category]} text-white capitalize`}
              >
                {currentQ.category}
              </Badge>
            </div>
            <CardTitle className="text-2xl">{currentQ.question}</CardTitle>
            <CardDescription>
              <div className="flex items-center justify-between mt-2">
                <span>Time remaining: {timeLeft}s</span>
                <span>Score: {score}/{currentQuestion}</span>
              </div>
              <Progress 
                value={timeLeft / 30 * 100} 
                className="h-2 mt-2"
                color={timeLeft < 10 ? "bg-red-500" : timeLeft < 20 ? "bg-amber-500" : "bg-green-500"}
              />
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  selectedOption === index 
                    ? isCorrect 
                      ? "default" 
                      : "destructive"
                    : showExplanation && index === currentQ.correctAnswer
                    ? "default" 
                    : "outline"
                }
                className={`w-full justify-start text-left p-4 h-auto ${
                  selectedOption === index 
                    ? isCorrect 
                      ? "bg-green-500 hover:bg-green-600" 
                      : "bg-red-500 hover:bg-red-600"
                    : showExplanation && index === currentQ.correctAnswer
                    ? "bg-green-500 hover:bg-green-600" 
                    : ""
                }`}
                onClick={() => handleSelectOption(index)}
                disabled={showExplanation}
              >
                <span className="mr-2">{String.fromCharCode(65 + index)}.</span> 
                {option}
                {showExplanation && index === currentQ.correctAnswer && (
                  <CheckCircle2 className="ml-auto h-5 w-5" />
                )}
                {showExplanation && selectedOption === index && !isCorrect && (
                  <XCircle className="ml-auto h-5 w-5" />
                )}
              </Button>
            ))}
            
            {showExplanation && (
              <div className="bg-muted p-4 rounded-lg mt-4">
                <h4 className="font-medium">Explanation:</h4>
                <p>{currentQ.explanation}</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter>
            <Button
              onClick={handleNextQuestion}
              className="w-full gradient-bg"
              disabled={!showExplanation}
            >
              {currentQuestion < sampleQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="glass-card text-center">
          <CardHeader>
            <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
            <CardDescription className="text-lg">
              You scored {score} out of {sampleQuestions.length}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="py-6">
              <div className="h-32 w-32 mx-auto gradient-bg rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {score === sampleQuestions.length
                  ? "Perfect Score!"
                  : score >= sampleQuestions.length * 0.7
                  ? "Great Job!"
                  : score >= sampleQuestions.length * 0.4
                  ? "Good Effort!"
                  : "Keep Practicing!"}
              </h3>
              <p className="text-muted-foreground">
                {score === sampleQuestions.length
                  ? "You've mastered this quiz! Try another one to keep learning."
                  : score >= sampleQuestions.length * 0.7
                  ? "Excellent work! Just a few more to perfect."
                  : score >= sampleQuestions.length * 0.4
                  ? "You're making progress! Review and try again."
                  : "Don't worry! Learning takes time. Review and try again."}
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button onClick={handleRestartQuiz} className="gradient-bg">
              Restart Quiz
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
