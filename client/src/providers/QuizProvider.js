import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"

export const QuizContext = createContext();

export function QuizProvider(props) {

  const [quiz, setQuiz] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getQuiz = () => {
    getToken().then((token) =>
      fetch(`/api/question`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((questions) => {
          setQuiz(questions);
        }
        )
    );
  };

  return (
    <QuizContext.Provider
      value={{
        quiz,
        getQuiz
      }}
    >
      {props.children}
    </QuizContext.Provider>
  );
}