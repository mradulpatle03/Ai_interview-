import { useState } from "react";
import { Brain, Target, Users } from "lucide-react";
import Quiz from "../components/Quiz";

function QuizPage() {
  const [category, setCategory] = useState("DSA");
  const [difficulty, setDifficulty] = useState("easy");
  const [started, setStarted] = useState(false);

  const categories = [
    { value: "DSA", label: "Data Structures & Algorithms", icon: Brain, color: "cyan" },
    { value: "SystemDesign", label: "System Design", icon: Target, color: "violet" },
    { value: "CSFundamentals", label: "CS Fundamentals", icon: Users, color: "rose" }
  ];

  const difficulties = [
    { value: "easy", label: "Easy", desc: "Warm-up challenges" },
    { value: "medium", label: "Medium", desc: "Step up your skills" },
    { value: "hard", label: "Hard", desc: "Expert level" }
  ];

  const getColorClasses = (color, isActive) => {
    const colors = {
      cyan: isActive
        ? "bg-cyan-600 text-white shadow-lg"
        : "bg-cyan-50 text-cyan-800 hover:bg-cyan-100",
      violet: isActive
        ? "bg-violet-600 text-white shadow-lg"
        : "bg-violet-50 text-violet-800 hover:bg-violet-100",
      rose: isActive
        ? "bg-rose-600 text-white shadow-lg"
        : "bg-rose-50 text-rose-800 hover:bg-rose-100"
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-cyan-500 to-violet-500 rounded-3xl mb-4 shadow-xl">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Ace Your Interviews
          </h1>
          <p className="text-lg text-gray-600">
            Pick a topic and difficulty to get started
          </p>
        </div>

        {/* Category Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Focus Area
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = category === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`flex flex-col items-center p-6 rounded-2xl transition-all duration-200 ${getColorClasses(cat.color, isActive)} ${
                    isActive ? "scale-105" : "hover:scale-105"
                  }`}
                >
                  <Icon className="w-7 h-7 mb-2" />
                  <span className="font-semibold text-sm text-center">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Difficulty Level
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {difficulties.map((diff) => {
              const isActive = difficulty === diff.value;
              return (
                <button
                  key={diff.value}
                  onClick={() => setDifficulty(diff.value)}
                  className={`p-5 rounded-2xl text-left transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 shadow-sm hover:shadow-md hover:scale-102"
                  }`}
                >
                  <div className="font-semibold text-base mb-1">{diff.label}</div>
                  <div className={`text-sm ${isActive ? "text-cyan-100" : "text-gray-500"}`}>
                    {diff.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Quiz Button */}
        {!started && (
          <div className="text-center mb-10">
            <button
              onClick={() => setStarted(true)}
              className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:bg-cyan-600 transition-all"
            >
              Start Quiz
            </button>
          </div>
        )}

        {/* Quiz Component */}
        {started && (
          <Quiz category={category} difficulty={difficulty} />
        )}
      </div>
    </div>
  );
}

export default QuizPage;
