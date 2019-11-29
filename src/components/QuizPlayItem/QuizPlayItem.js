import React from "react";
import "../QuizPlayItem/quizplayitem.scss";

const QuizPlayItem = ({ question, answer, checkAnswer }) => {
  let number = 0;
  return (
    <div>
      <h1>{question}</h1>
      <div className="quizplayitem__container">
        {answer.map(answer => {
          return (
            <div
              key={number++}
              className="quizplayitem--answer"
              onClick={() => checkAnswer(answer)}
            >
              <h4>{answer.a}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizPlayItem;
