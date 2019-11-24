import React from "react";
import QuizItem from "../QuizItem/QuizItem";
const QuizList = ({ qList, deleteQuizItem }) => {
  return (
    <>
      {qList.map(q => {
        return (
          <QuizItem
            key={q._id}
            question={q.question}
            answer={q.answer}
            deleteQ={() => deleteQuizItem(q._id)}
          />
        );
      })}
    </>
  );
};

export default QuizList;
