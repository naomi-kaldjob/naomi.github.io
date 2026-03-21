import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch("https://ton-api-n8n.onrender.com/qcm")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswer = (choice) => {
    if (choice === questions[index].answer) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const next = () => {
    setIndex(index + 1);
    setShowAnswer(false);
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setShowAnswer(false);
  };

  if (!questions.length) return <p>Chargement...</p>;

  if (index >= questions.length) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">Score : {score}</h1>
        <button onClick={reset} className="mt-5 bg-blue-500 text-white px-4 py-2 rounded">
          Recommencer
        </button>
      </div>
    );
  }

  const q = questions[index];

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-xl mx-auto mt-20 p-6 shadow-lg rounded-2xl"
    >
      <h2 className="text-xl font-bold mb-4">{q.question}</h2>

      {q.choices.map((c, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(c)}
          className="block w-full mb-2 p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {c}
        </button>
      ))}

      {showAnswer && (
        <p className="mt-4">
          Réponse : <strong>{q.answer}</strong>
        </p>
      )}

      {showAnswer && (
        <button onClick={next} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Suivant
        </button>
      )}

      <p className="mt-4">Score : {score}</p>
    </motion.div>
  );
}

export default App;
