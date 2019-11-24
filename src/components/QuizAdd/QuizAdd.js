import React, { useState } from "react";
import "./quizadd.scss";

const QuizAdd = ({ addQuizItem }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const changeQuestion = e => {
    setQuestion(e.target.value);
  };

  const changeAnswer = e => {
    setAnswer(e.target.value);
  };

  const postAnswer = () => {
    addQuizItem(question, answer);
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="quizadd__container">
      <div>
        <h4>le question</h4>
        <textarea value={question} onChange={changeQuestion} />
      </div>
      <div>
        <h4>le answer</h4>
        <textarea value={answer} onChange={changeAnswer} />
      </div>
      <button onClick={postAnswer}>add</button>
    </div>
  );
};

export default QuizAdd;
