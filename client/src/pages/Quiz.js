import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { QuizContext } from "../providers/QuizProvider"
import QuestionCard from "../components/QuestionCard"

const Quiz = () => {
  const { quiz, getQuiz } = useContext(QuizContext);

  useEffect(() => {
    getQuiz();
  }, [])

  return (
    <section>
      {quiz.map((q) => (
        <div className="m-4" key={q.id}>
          <QuestionCard question={q} />
        </div>
      ))}
    </section>
  )
}

export default Quiz;