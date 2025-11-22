"use client";

import { useState } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type ResultProps = {
  score: number;
  onRetake: () => void;
};

export default function Result({ score, onRetake }: ResultProps) {
  const tier = score <= 25
    ? { title: "Muggle at Heart", img: "/muggle-at-heart.png" }
    : score <= 50
    ? { title: "Hogwarts Newcomer", img: "/hogwarts-newcomer.png" }
    : score <= 75
    ? { title: "Brave Gryffindor", img: "/brave-gryffindor.png" }
    : { title: "Chosen One Energy", img: "/chosen-one-energy.png" };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">{tier.title}</h2>
      <img
        src={tier.img}
        alt={tier.title}
        width={512}
        height={512}
        className="rounded"
      />
      <Share
        text={`I scored ${score.toFixed(0)}% Harry! ${url}`}
      />
      <button
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
        onClick={onRetake}
      >
        Retake Quiz
      </button>
    </div>
  );
}
