import React from "react";
import "../QuizFilter/quizfilter.scss";

const QuizFilter = ({ toggleFilter }) => {
  return (
    <select onChange={toggleFilter} className="quizfilter--select">
      <option value="All">All</option>
      <option value="React">React</option>
      <option value="Angular">Angular</option>
      <option value="Misc">Misc</option>
    </select>
  );
};

export default QuizFilter;
