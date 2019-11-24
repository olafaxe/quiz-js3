import React, { useState, useEffect } from "react";
import "./App.css";

import QuizList from "./components/QuizList/QuizList";
import QuizAdd from "./components/QuizAdd/QuizAdd";

const App = () => {
  const [qList, setQList] = useState([]);

  const gettingData = async url => {
    try {
      let res = await fetch(url);
      let data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const sendingData = async (url, method, body) => {
    try {
      let res = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      });
      let data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const deletingData = async url => {
    try {
      let res = await fetch(url, {
        method: "DELETE"
      });
      let data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const addQuizItem = (q, a) => {
    let quizItem = { question: q, answer: a, date: Date.now() };
    console.log(quizItem);
    sendingData("/quiz", "POST", quizItem).then(data => {
      if (data) {
        setQList([data, ...qList]);
      } else {
        return null;
      }
    });
  };

  const deleteQuizItem = url => {
    deletingData(`/quiz/${url}`).then(data => {
      if (data) {
        console.log(data);
        let list = qList.filter(q => q._id !== data);
        setQList([...list]);
      } else {
        console.log("error");
      }
    });
  };

  useEffect(() => {
    gettingData("/quiz").then(data =>
      data ? setQList([...data.sort((a, b) => b.date - a.date)]) : null
    );
  }, []);

  console.log(qList);
  return (
    <div className="App">
      <QuizAdd addQuizItem={addQuizItem} />
      <QuizList qList={qList} deleteQuizItem={deleteQuizItem} />
    </div>
  );
};

export default App;
