import React, { useState } from "react";
import "../QuizItem/quizitem.scss";

const QuizItem = ({ id, question, answer, tag, deleteQ, editQuizItem }) => {
  const [hiddenAnswer, setHiddenAnswer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [answerValue, setAnswerValue] = useState(answer[0].a);

  const toggleAnswer = () => {
    setHiddenAnswer(!hiddenAnswer);
  };

  const switchEditMode = () => {
    setEditMode(!editMode);
  };

  const changeInputValue = e => {
    setAnswerValue(e.target.value);
  };

  const finishedEdit = () => {
    editQuizItem(id, answerValue);
    switchEditMode();
  };

  return (
    <div className={`quizitem__container quizitem--${tag}`}>
      <button className="quizitem--delete" onClick={deleteQ}>
        x
      </button>
      <h1>{question}</h1>
      {hiddenAnswer ? (
        <>
          {!editMode ? (
            <>
              <h4>{answer[0].a}</h4>{" "}
              <div className="quizitem--edit__container">
                <h3 className="quizitem--edit edit" onClick={switchEditMode}>
                  Edit
                </h3>
              </div>
            </>
          ) : (
            <>
              <textarea
                className="quizlist--text"
                id="quizanswer"
                value={answerValue}
                onChange={changeInputValue}
              />
              <div className="quizitem--edit__container">
                <h3 className="quizitem--edit done" onClick={finishedEdit}>
                  Done
                </h3>
              </div>
            </>
          )}
        </>
      ) : null}
      <button className="quizitem--toggle" onClick={toggleAnswer}>
        {!hiddenAnswer ? "Show Answer" : "Hide Answer"}
      </button>
    </div>
  );
};

export default QuizItem;
