"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "In what year was Temüjin proclaimed Chinggis Khaan at the Great Ikh Khuraldai?",
    options: ["1162 AD", "1206 AD", "1271 AD", "1368 AD"],
    correct: 1,
    explanation: "In 1206 AD, after uniting all nomadic steppe clans along the Onon River, Temüjin was bestowed the title Chinggis Khaan."
  },
  {
    id: 2,
    question: "What was the name of the ancient postal relay communication network of the Mongol Empire?",
    options: ["Yam (Үртөө)", "Yassa (Их Засаг)", "Toono (Тооно)", "Paiza (Пайз)"],
    correct: 0,
    explanation: "The Yam system used horse relay stations situated every 25-30 miles across Eurasia, allowing riders to transmit dispatches faster than ever before."
  },
  {
    id: 3,
    question: "Which sacred musical instrument features horsehair strings and a carved horse head?",
    options: ["Tshuur", "Yochin", "Morin Khuur (Морин хуур)", "Limbhe"],
    correct: 2,
    explanation: "The Morin Khuur is the iconic horsehead fiddle, inscribed on UNESCO's Representative List of Intangible Cultural Heritage."
  },
  {
    id: 4,
    question: "What is the sacred circular opening at the apex of a Mongolian Ger called?",
    options: ["Khana", "Toono", "Bagana", "Uni"],
    correct: 1,
    explanation: "The Toono is the roof crown ring serving as a window to the Eternal Blue Sky (Munkh Tengri) and a natural sundial."
  }
];

export default function InteractiveQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleAnswer = (optionIdx: number) => {
    const updated = [...selectedAnswers, optionIdx];
    setSelectedAnswers(updated);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
      // Trigger celebratory confetti if score is >= 3
      const correctCount = updated.reduce(
        (acc, val, idx) => (val === QUIZ_QUESTIONS[idx].correct ? acc + 1 : acc),
        0
      );
      if (correctCount >= 3) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const score = selectedAnswers.reduce(
    (acc, val, idx) => (val === QUIZ_QUESTIONS[idx].correct ? acc + 1 : acc),
    0
  );

  return (
    <section id="quiz" className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award className="w-4 h-4 text-amber-400" />
          Scholar Knowledge Assessment
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-100">
          Test Your <span className="text-amber-400">Steppe Scholarship</span>
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
          Verify your understanding of Mongolian imperial statecraft, law, music, and nomadic architecture.
        </p>
      </div>

      <div className="p-6 md:p-10 rounded-3xl bg-slate-900/80 border border-amber-500/30 shadow-2xl backdrop-blur-xl">
        {!showResults ? (
          <div>
            {/* Progress bar */}
            <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-4">
              <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 mb-8 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question title */}
            <h3 className="text-xl md:text-2xl font-bold text-amber-100 mb-6 leading-relaxed">
              {QUIZ_QUESTIONS[currentStep].question}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUIZ_QUESTIONS[currentStep].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleAnswer(oIdx)}
                  className="p-4 text-left rounded-2xl bg-slate-950 border border-amber-500/20 text-slate-200 font-medium hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-200 transition-all shadow-md flex items-center justify-between group"
                >
                  <span className="text-sm">{opt}</span>
                  <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 group-hover:bg-amber-500/20 group-hover:text-amber-300 transition-colors">
                    Select
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-300">
              <Sparkles className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-200 mb-2">
                Assessment Complete!
              </h3>
              <p className="text-base text-slate-300">
                You scored <strong className="text-amber-400 text-xl">{score}</strong> out of <strong className="text-slate-100 text-xl">{QUIZ_QUESTIONS.length}</strong>
              </p>
            </div>

            {/* Certificate badge */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/50 to-slate-950 border border-amber-400/40 text-left max-w-lg mx-auto space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <span className="text-xs font-serif font-bold text-amber-400 tracking-wider uppercase">
                  Steppe Scholar Certificate
                </span>
                <span className="text-xs text-amber-300/80 font-mono">
                  {score >= 3 ? "Grade: Passed with Distinction" : "Grade: Scholar Candidate"}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {score >= 3
                  ? "Congratulations! You have demonstrated deep knowledge of Mongolian historical statecraft, traditional arts, and nomadic architecture."
                  : "Keep exploring the monograph and timeline to master Mongolian culture and history!"}
              </p>
            </div>

            {/* Answer Explanations */}
            <div className="text-left space-y-3 max-w-lg mx-auto pt-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Answer Review:</h4>
              {QUIZ_QUESTIONS.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correct;
                return (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-slate-200">{q.question}</span>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-400">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{q.explanation}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
            >
              <RotateCcw className="w-4 h-4" /> Retake Scholar Assessment
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
