import { useState, useEffect } from "react";
import axios from "axios";

function Quiz({ category, difficulty }) {
    
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      const { data } = await axios.get(`http://localhost:5000/api/quiz?category=${category}&difficulty=${difficulty}`);
      console.log("data:",data);
      setQuestions(data);
    }
    fetchQuestions();
  }, [category, difficulty]);

  const handleOptionSelect = (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = async () => {
    const payload = Object.entries(answers).map(([questionId, selectedOption]) => ({ questionId, selectedOption }));
    const { data } = await axios.post('http://localhost:5000/api/quiz/submit', { answers: payload });
    setResult(data);
  };

  if (result) {
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>Total Questions: {result.total}</p>
        <p>Correct Answers: {result.correct}</p>
        <p>Accuracy: {result.accuracy}%</p>
      </div>
    );
  }

  return (
    <div>
      {questions.map((q, idx) => (
        <div key={q._id} style={{ marginBottom: '20px' }}>
          <h3>{idx + 1}. {q.text}</h3>
          {q.options.map((opt, i) => (
            <div key={i}>
              <input
                type="radio"
                name={q._id}
                value={opt.text}
                checked={answers[q._id] === opt.text}
                onChange={() => handleOptionSelect(q._id, opt.text)}
              />
              {opt.text}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}

export default Quiz;
