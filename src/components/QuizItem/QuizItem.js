import React, { useState } from "react";
import "../QuizItem/quizitem.scss";

const QuizItem = ({ id, question, answer, tag, deleteQ, editQuizItem }) => {
  const [hiddenAnswer, setHiddenAnswer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [answerValue, setAnswerValue] = useState("");

  const toggleAnswer = () => {
    setHiddenAnswer(!hiddenAnswer);
  };

  const switchEditMode = () => {
    setEditMode(!editMode);
  };

  const changeInputValue = e => {
    setAnswerValue(e.target.value);
  };

  return (
    <div className={`quizitem__container quizitem--${tag}`}>
      <button className="quizitem--edit" onClick={switchEditMode}>
        E
      </button>
      <button className="quizitem--delete" onClick={deleteQ}>
        x
      </button>
      <h1>{question}</h1>
      {hiddenAnswer ? <h4>{answer[0].a}</h4> : null}
      <button className="quizitem--toggle" onClick={toggleAnswer}>
        {!hiddenAnswer ? "Show Answer" : "Hide Answer"}
      </button>
      {editMode ? (
        <>
          <textarea
            className="quizlist--text"
            id="quizanswer"
            cols="35"
            rows="5"
            value={answerValue}
            onChange={changeInputValue}
          />
          <button onClick={() => editQuizItem(id, answerValue)}>add</button>
        </>
      ) : null}
      {/*  */}
    </div>
  );
};

export default QuizItem;
