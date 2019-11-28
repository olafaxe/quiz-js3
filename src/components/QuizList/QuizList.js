import React from "react";
import QuizItem from "../QuizItem/QuizItem";
const QuizList = ({ filteredList, deleteQuizItem, editQuizItem }) => {
  return (
    <>
      {filteredList.map(q => {
        return (
          <QuizItem
            key={q._id}
            id={q._id}
            question={q.question}
            answer={q.answer}
            tag={q.tag}
            deleteQ={() => deleteQuizItem(q._id)}
            editQuizItem={editQuizItem}
          />
        );
      })}
    </>
  );
};

export default QuizList;
