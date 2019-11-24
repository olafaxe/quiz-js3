import React from "react";
import QuizItem from "../QuizItem/QuizItem";
const QuizList = ({ filteredList, deleteQuizItem }) => {
  return (
    <>
      {filteredList.map(q => {
        return (
          <QuizItem
            key={q._id}
            question={q.question}
            answer={q.answer}
            tag={q.tag}
            deleteQ={() => deleteQuizItem(q._id)}
          />
        );
      })}
    </>
  );
};

export default QuizList;
