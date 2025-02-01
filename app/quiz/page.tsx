"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface options{
    id:number;
    description:string;
    is_correct:boolean;
}

interface Question {
  id: number;
  description: string;
  options: Array<options>;
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        // console.log(data)
        setQuestions([...data.questions]);
        console.log(data.questions)
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load quiz questions. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  

  const handleAnswer = () => {
    const selectedOption = questions[currentQuestion].options.find(
        (option) => option.description === selectedAnswer
      );
    if (selectedOption && selectedOption.is_correct) {
      setScore(score + 1);
      console.log('correct answer')
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResults(false);
  };


  if (isLoading) {
    return null; // Next.js will show the loading.tsx component
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg text-center">
            <CardContent className="space-y-6 p-8">
              <div className="text-xl text-destructive">{error}</div>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Brain className="w-8 h-8 text-primary mr-2" />
          <h1 className="text-3xl font-bold text-primary">Quiz-Master</h1>
        </div>

        {!showResults && questions.length > 0 ? (
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <CardTitle className="text-xl">
                  Question {currentQuestion + 1} of {questions.length}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  Score: {score}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  {questions[currentQuestion].description}
                </h2>
                <RadioGroup
                  value={selectedAnswer}
                  onValueChange={setSelectedAnswer}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option,index) => (
                    <div
                      key={`${currentQuestion}-${index}`} 
                      className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent cursor-pointer"
                    >
                      <RadioGroupItem value={option.description} id={`${currentQuestion}-${index}`} />
                      <Label htmlFor={`${currentQuestion}-${index}`} className="flex-grow cursor-pointer">
                        {option.description}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleAnswer}
                  disabled={!selectedAnswer}
                >
                  {currentQuestion === questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : showResults ? (
          <Card className="shadow-lg text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-4xl font-bold text-primary">
                {score} / {questions.length}
              </div>
              <p className="text-lg text-muted-foreground">
                You got {score} out of {questions.length} questions correct!
              </p>
              <Button size="lg" onClick={restartQuiz}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}