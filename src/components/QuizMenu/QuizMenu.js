import React, { useState } from "react";
import QuizList from "../QuizList/QuizList";
import QuizFilter from "../QuizFilter/QuizFilter";
import QuizPlay from "../QuizPlay/QuizPlay";
import "../QuizMenu/quizmenu.scss";

const QuizMenu = ({
  filteredList,
  deleteQuizItem,
  editQuizItem,
  toggleFilter,
  gettingData
}) => {
  const [toggledMenu, setToggledMenu] = useState(null);

  const toggleMenuValue = e => {
    setToggledMenu(e);
  };

  return (
    <>
      <div className="quizmenu__container">
        <button onClick={() => toggleMenuValue("list")}>List</button>
        <button onClick={() => toggleMenuValue("play")}>Play</button>
      </div>
      {toggledMenu === "list" ? (
        <>
          <QuizFilter toggleFilter={toggleFilter} />
          <QuizList
            filteredList={filteredList}
            deleteQuizItem={deleteQuizItem}
            editQuizItem={editQuizItem}
          />
        </>
      ) : toggledMenu === "play" ? (
        <QuizPlay gettingData={gettingData} />
      ) : null}
    </>
  );
};

export default QuizMenu;
