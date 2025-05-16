
import { QuizGame } from "@/components/learning-games/quiz-game";

const LearningGames = () => {
  return (
    <div>
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Learning Games</h1>
        <p className="text-muted-foreground">
          Test your knowledge and have fun learning with our interactive games.
        </p>
      </div>
      
      <QuizGame />
    </div>
  );
};

export default LearningGames;
