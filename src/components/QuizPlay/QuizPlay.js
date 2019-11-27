import React, { useState, useEffect } from "react";
import "../QuizPlay/quizplay.scss";
import QuizPlayItem from "../QuizPlayItem/QuizPlayItem";

const QuizPlay = ({ gettingData }) => {
  const [qlistShuffled, setQListShuffle] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [gameInProgress, setGameInProgress] = useState(false);
  // const [wrongAnswers, setWrongAnswers] = useState([
  //   { a: "Ajax?", value: false },
  //   { a: "I dont know anything about javascript", value: false },
  //   { a: "json?", value: false },
  //   { a: "I think i took the wrong course", value: false },
  //   { a: "Can i call A-team?", value: false },
  //   { a: "I Wish Christoffer was here", value: false },
  //   { a: "I wish Daniel was here", value: false },
  //   { a: "I'm glad Ola aint here", value: false }
  // ]);

  const wrongAnswers = [
    { a: "Ajax?", value: false },
    { a: "I dont know anything about javascript", value: false },
    { a: "json?", value: false },
    { a: "I think i took the wrong course", value: false },
    { a: "Can i call A-team?", value: false },
    { a: "I Wish Christoffer was here", value: false },
    { a: "I wish Daniel was here", value: false },
    { a: "I'm glad Ola aint here", value: false }
  ];

  const getWrongAnswers = () => {
    let answers = wrongAnswers;
    for (let i = answers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    answers.splice(0, answers.length - 3);
    return answers;
  };
  const shuffleQuizItems = () => {
    gettingData("/quiz").then(data => {
      let items = data;
      for (let i = items.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      items.map(quiz => {
        let wrongAnswers = getWrongAnswers();

        return quiz.answer.push(
          wrongAnswers[0],
          wrongAnswers[1],
          wrongAnswers[2]
        );
      });
      setQListShuffle(items);
    });
  };

  const startQuiz = () => {
    setGameInProgress(!gameInProgress);
    getCurrentQuiz();
  };

  const getCurrentQuiz = () => {
    if (!qlistShuffled.length > 0) {
      alert("Woop woop, we did it fam!");
      setGameInProgress(!gameInProgress);
      setCurrentQuiz(null);
      shuffleQuizItems();
      return;
    }
    let quizList = qlistShuffled;
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
    if (!e.value) {
      console.log("FEEEL!");
    } else {
      console.log("RÄÄÄTTT");
      getCurrentQuiz();
    }
  };

  useEffect(() => {
    shuffleQuizItems();
  }, []);
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
