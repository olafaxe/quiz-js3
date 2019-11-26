import React, { useState, useEffect } from "react";
import "../QuizPlay/quizplay.scss";
import QuizPlayItem from "../QuizPlayItem/QuizPlayItem";

const QuizPlay = ({ gettingData }) => {
  const [qlistShuffled, setQListShuffle] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [gameInProgress, setGameInProgress] = useState(false);

  const shuffleQuizItems = () => {
    gettingData("/quiz").then(data => {
      console.log(data);
      let items = data;
      for (let i = items.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      items.map(quiz => {
        quiz.answer[1] = "fel svar";
        quiz.answer[2] = "fel svar";
        quiz.answer[3] = "fel svar";
      });
      setQListShuffle(items);
    });
  };

  const startQuiz = () => {
    setGameInProgress(!gameInProgress);
    getCurrentQuiz();
  };

  const getCurrentQuiz = () => {
    let quizList = qlistShuffled;
    console.log(quizList[0].answer);
    for (let i = quizList[0].answer.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [quizList[0].answer[i], quizList[0].answer[j]] = [
        quizList[0].answer[j],
        quizList[0].answer[i]
      ];
    }
    setCurrentQuiz(quizList[0]);
    quizList.shift();
    setQListShuffle(quizList);
  };

  const checkAnswer = e => {
    if (e === "fel svar") {
      console.log("FEEEL!");
    } else {
      console.log("RÄÄÄTTT");
      getCurrentQuiz();
    }
  };

  useEffect(() => {
    shuffleQuizItems();
  }, []);

  console.log(qlistShuffled);

  return (
    <div className="quizplay__container">
      {!currentQuiz ? <button onClick={startQuiz}>GO!</button> : null}
      {gameInProgress && currentQuiz ? (
        <QuizPlayItem
          checkAnswer={checkAnswer}
          question={currentQuiz.question}
          answer={currentQuiz.answer}
        />
      ) : null}
    </div>
  );
};

export default QuizPlay;
