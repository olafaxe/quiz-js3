import React, { useState } from "react";
import "./quizadd.scss";

const QuizAdd = ({ addQuizItem }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [tag, setTag] = useState("Misc");
  const [hideQuizAdd, setHideQuizAdd] = useState(true);

  const changeQuestion = e => {
    setQuestion(e.target.value);
  };

  const changeAnswer = e => {
    setAnswer(e.target.value);
  };

  const changeTag = e => {
    setTag(e.target.value);
  };
  const postAnswer = () => {
    if (question === "" || answer === "") {
      return;
    }
    addQuizItem(question, answer, tag);
    setQuestion("");
    setAnswer("");
    setTag("Misc");
  };

  const toggleQuizAdd = () => {
    setHideQuizAdd(!hideQuizAdd);
  };

  return (
    <div className="quizadd__container">
      <div className="quizadd__header">
        <h1 className="quizadd--title">QUIZ!</h1>
        <button className="quizadd--toggle" onClick={toggleQuizAdd}>
          {hideQuizAdd ? "+" : "-"}
        </button>
      </div>

      {!hideQuizAdd ? (
        <>
          <div>
            <label htmlFor="quizquestion">
              <h4>le question</h4>
            </label>
            <textarea
              className="quizadd--text"
              id="quizquestion"
              cols="35"
              rows="5"
              value={question}
              onChange={changeQuestion}
            />
          </div>
          <div>
            <h4>le answer</h4>
            <textarea
              className="quizadd--text"
              cols="35"
              rows="10"
              value={answer}
              onChange={changeAnswer}
            />
          </div>
          <div className="quizadd--taglist">
            <div>
              <input
                className="quizadd--radio"
                onChange={changeTag}
                type="radio"
                id="React"
                name="filter"
                value="React"
              />
              <label htmlFor="React">React</label>
            </div>
            <div>
              <input
                className="quizadd--radio"
                onChange={changeTag}
                type="radio"
                id="Angular"
                name="filter"
                value="Angular"
              />
              <label htmlFor="React">Angular</label>
            </div>
            <div>
              <input
                className="quizadd--radio"
                onChange={changeTag}
                type="radio"
                id="Misc"
                name="filter"
                value="Misc"
                defaultChecked="checked"
              />
              <label htmlFor="React">Misc</label>
            </div>
          </div>

          <button className="quizadd--add" onClick={postAnswer}>
            add
          </button>
        </>
      ) : null}
    </div>
  );
};

export default QuizAdd;
