import React, { useState } from "react";
import "../QuizItem/quizitem.scss";

const QuizItem = ({ question, answer, tag, deleteQ }) => {
  const [hiddenAnswer, setHiddenAnswer] = useState(false);

  const toggleAnswer = () => {
    setHiddenAnswer(!hiddenAnswer);
  };
  console.log(answer);
  return (
    <div className={`quizitem__container quizitem--${tag}`}>
      <button className="quizitem--delete" onClick={deleteQ}>
        x
      </button>
      <h1>{question}</h1>
      {hiddenAnswer ? <h4>{answer[0].a}</h4> : null}
      <button className="quizitem--toggle" onClick={toggleAnswer}>
        {!hiddenAnswer ? "Show Answer" : "Hide Answer"}
      </button>
    </div>
  );
};

export default QuizItem;
