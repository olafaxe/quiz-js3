import React, { useState, useEffect } from "react";
import "./App.css";

import QuizAdd from "./components/QuizAdd/QuizAdd";
import QuizMenu from "./components/QuizMenu/QuizMenu";

const App = () => {
  const [qList, setQList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const toggleFilter = e => {
    setSelectedFilter(e.target.value);
  };

  const filterQuizItems = items => {
    if (selectedFilter === "All") {
      return items;
    } else {
      return items.filter(item => item.tag === selectedFilter);
    }
  };
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

  const addQuizItem = (q, a, t) => {
    let quizItem = { question: q, answer: [a], tag: t, date: Date.now() };
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

  return (
    <div className="App">
      <QuizAdd addQuizItem={addQuizItem} />
      <QuizMenu
        filteredList={filterQuizItems(qList)}
        deleteQuizItem={deleteQuizItem}
        toggleFilter={toggleFilter}
        gettingData={gettingData}
      ></QuizMenu>
    </div>
  );
};

export default App;
