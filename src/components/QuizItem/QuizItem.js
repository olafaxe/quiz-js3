import React from "react";
import "../QuizItem/quizitem.scss";

const QuizItem = ({ question, answer, deleteQ }) => {
  return (
    <div className="quizitem__container">
      <h1>{question}</h1>
      <h4>{answer}</h4>
      <button onClick={deleteQ}>Delete</button>
    </div>
  );
};

export default QuizItem;
