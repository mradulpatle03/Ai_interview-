import { useState, useEffect } from "react";
import axios from "axios";

function Quiz({ category, difficulty, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      const { data } = await axios.get(
        `http://localhost:5000/api/quiz?category=${category}&difficulty=${difficulty}`
      );
      setQuestions(data);
    }
    fetchQuestions();
  }, [category, difficulty]);

  const handleOptionSelect = (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = async () => {
    if (!questions.length) return;
    setSubmitting(true);

    const payload = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    }));

    try {
      const { data } = await axios.post("http://localhost:5000/api/quiz/submit", {
        answers: payload,
      });

      // Compute extra metrics if backend doesn't provide
      const total = data.total || questions.length;
      const correct = data.correct || 0;
      const incorrect = total - correct;
      const accuracy = Math.round((correct / total) * 100);

      onComplete({ total, correct, incorrect, accuracy });
    } catch (err) {
      console.error("Error submitting quiz:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      {questions.map((q, idx) => (
        <div key={q._id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Question {idx + 1}</h3>
            <span className="text-sm text-gray-500">{q.options.length} options</span>
          </div>
          <p className="text-base text-gray-800 mb-5">{q.text}</p>
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = answers[q._id] === opt.text;
              return (
                <label key={i} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? "border-yellow-500 bg-yellow-50 shadow-sm"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}>
                  <input
                    type="radio"
                    name={q._id}
                    value={opt.text}
                    checked={isSelected}
                    onChange={() => handleOptionSelect(q._id, opt.text)}
                    className="h-4 w-4 text-yellow-600 border-gray-300 focus:ring-yellow-500"
                  />
                  <span className={`text-sm ${isSelected ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                    {opt.text}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all flex items-center gap-2 ${
            submitting ? "opacity-70 cursor-not-allowed bg-amber-800" : ""
          }`}
        >
          {submitting ? "Please Wait..." : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
