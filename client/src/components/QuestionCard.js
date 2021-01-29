import React from "react";

const QuestionCard = ({ question }) => {

  const questionCard = (q) => {
    console.log(q)
    if (q.questionType.name === "MultipleChoice") {
      return (<>
        <div>{q.content}</div>
        {q.answers.map((a) => {
          return (<div>{a.content}</div>)
        })}
      </>
      )
    } else if (q.questionType.name === "TrueFalse") {
      return (<>
        <div>{q.content}</div>
        {q.answers.map((a) => {
          return (<div>{a.content}</div>)
        })}
      </>
      )
    } else if (q.questionType === "MultipleAnswer") {
      return (<>
        <div>{q.content}</div>
        {q.answers.map((a) => {
          return (<div>{a.content}</div>)
        })}
      </>
      )
    }
  }

  return (
    <div>
      { questionCard(question)}
    </div>
  )
}

export default QuestionCard;