import { useState, useEffect } from "react";
import { Brain, Target, Users, RotateCcw, Clock, Loader2 } from "lucide-react";
import Quiz from "../components/Quiz";

function QuizPage() {
  const [category, setCategory] = useState("DSA");
  const [difficulty, setDifficulty] = useState("easy");
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Timer Effect
  useEffect(() => {
    let interval;
    if (timerOn) {
      interval = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  const categories = [
    { value: "DSA", label: "Data Structures & Algorithms", icon: Brain },
    { value: "SystemDesign", label: "System Design", icon: Target },
    { value: "CSFundamentals", label: "CS Fundamentals", icon: Users },
  ];

  const difficulties = [
    { value: "easy", label: "Easy", desc: "Warm-up challenges" },
    { value: "medium", label: "Medium", desc: "Step up your skills" },
    { value: "hard", label: "Hard", desc: "Expert level" },
  ];

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      setStarted(true);
      setCompleted(false);
      setResult(null);
      setTime(0);
      setTimerOn(true);
      setLoading(false);
    }, 1200); // simulate loading
  };

  const handleRestart = () => {
    setStarted(false);
    setCompleted(false);
    setTimerOn(false);
    setTime(0);
    setResult(null);
  };

  const handleQuizComplete = (res) => {
    setTimerOn(false);
    setResultLoading(true);
    setTimeout(() => {
      setResult({ ...res, timeTaken: time });
      setCompleted(true);
      setResultLoading(false);
    }, 1500); // simulate result calculation
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-12 border-b border-gray-200 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Ace Your Interviews
            </h1>
            <p className="text-base text-gray-600">
              Pick a topic and difficulty to get started
            </p>
          </div>
          {started && !completed && (
            <div className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="font-medium">{time}s</span>
            </div>
          )}
        </header>

        {/* Category & Difficulty Selection */}
        {!started && !loading && (
          <>
            <section className="mb-12">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                Focus Area
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  const isActive = category === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={`flex items-center gap-3 px-5 py-6 rounded-lg border transition-all duration-200 text-left shadow-sm ${
                        isActive
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-200 bg-white hover:shadow-md hover:-translate-y-0.5"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? "text-yellow-600" : "text-gray-400"}`} />
                      <span className={`font-medium ${isActive ? "text-gray-900" : "text-gray-700"}`}>
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                Difficulty Level
              </h2>
              <div className="flex gap-4">
                {difficulties.map(diff => {
                  const isActive = difficulty === diff.value;
                  return (
                    <button
                      key={diff.value}
                      onClick={() => setDifficulty(diff.value)}
                      className={`px-6 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "border-yellow-500 bg-yellow-50 text-yellow-700 shadow-sm"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                      }`}
                    >
                      {diff.label}
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="flex justify-end">
              <button
                onClick={handleStart}
                className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all flex items-center gap-2"
              >
                Start Quiz
              </button>
            </div>
          </>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-yellow-600 animate-spin" />
            <span className="text-gray-700 font-medium">Preparing your quiz...</span>
          </div>
        )}

        {/* Quiz */}
        {started && !loading && (
          <div className="mt-10">
            
            {
              !(completed && result && !resultLoading) && (
                  <Quiz category={category} difficulty={difficulty} onComplete={handleQuizComplete} />
              )
            }

            {/* Result Loading */}
            {resultLoading && (
              <div className="flex justify-center items-center py-12 gap-3">
                <Loader2 className="w-8 h-8 text-yellow-600 animate-spin" />
                <span className="text-gray-700 font-medium">Calculating results...</span>
              </div>
            )}

            {/* Completed Result */}
            {completed && result && !resultLoading && (
              <div className="mt-6 max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">🎉 Quiz Completed!</h2>
                <div className="text-center mb-6">
                  <span className="text-gray-600 text-lg">Time Taken: </span>
                  <span className="font-semibold text-gray-900 text-xl">{result.timeTaken}s</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Total Questions</p>
                    <p className="text-xl font-semibold text-gray-900">{result.total}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Correct</p>
                    <p className="text-xl font-semibold text-green-600">{result.correct}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Incorrect</p>
                    <p className="text-xl font-semibold text-red-600">{result.incorrect}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Accuracy</p>
                    <p className="text-xl font-semibold text-yellow-600">{result.accuracy}%</p>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="mb-8 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Correct Answers</p>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div className="h-4 rounded-full bg-green-400" style={{ width: `${(result.correct/result.total)*100}%` }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Incorrect Answers</p>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div className="h-4 rounded-full bg-red-400" style={{ width: `${(result.incorrect/result.total)*100}%` }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Accuracy</p>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div className="h-4 rounded-full bg-yellow-400" style={{ width: `${result.accuracy}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Restart Quiz
                  </button>
                  <button
                    onClick={() => window.location.reload()} 
                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                  >
                    Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
