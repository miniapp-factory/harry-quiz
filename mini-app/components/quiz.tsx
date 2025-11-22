"use client";

import { useState } from "react";
import Result from "./result";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: "What is your favorite Hogwarts house?",
    options: ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"],
    answer: "Gryffindor",
  },
  {
    question: "Which spell would you use most often?",
    options: ["Expelliarmus", "Lumos", "Accio", "Wingardium Leviosa"],
    answer: "Expelliarmus",
  },
  {
    question: "What is your preferred mode of transportation?",
    options: ["Broomstick", "Flying Ford Anglia", "Platform 9¾", "Muggle car"],
    answer: "Broomstick",
  },
  {
    question: "Which magical creature would you be?",
    options: ["Phoenix", "Dragon", "Unicorn", "House‑Elf"],
    answer: "Phoenix",
  },
  {
    question: "What is your favorite Hogwarts subject?",
    options: ["Potions", "Transfiguration", "Defense Against the Dark Arts", "Charms"],
    answer: "Defense Against the Dark Arts",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const handleAnswer = (choice: string) => {
    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // calculate score
      const correct = newAnswers.filter(
        (ans, idx) => ans === questions[idx].answer
      ).length;
      setScore((correct / questions.length) * 100);
    }
  };

  const retake = () => {
    setCurrent(0);
    setAnswers([]);
    setScore(null);
  };

  if (score !== null) {
    return <Result score={score} onRetake={retake} />;
  }

  const q = questions[current];
  const shuffledOptions = shuffleArray(q.options);

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold">{q.question}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt) => (
          <button
            key={opt}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <Share
        text={`I scored ${score?.toFixed(0) ?? "?"}% Harry! ${url}`}
      />
    </div>
  );
}
