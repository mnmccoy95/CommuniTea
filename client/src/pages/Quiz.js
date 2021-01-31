import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { QuizContext } from "../providers/QuizProvider"
import { UserProfileContext } from "../providers/UserProfileProvider"

const Quiz = () => {
  const [newPost, setNewPost] = useState([]);
  const { getToken, logout } = useContext(UserProfileContext);
  const history = useHistory();

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    const answers = []
    for (const id of newPost) {
      if (id !== undefined) {
        answers.push(parseInt(id))
      }
    }
    const answer = { "answers": answers }

    return getToken().then((token) =>
      fetch(`/api/userprofile/answer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(answers)
      }).then(resp => resp.json())
        .then((resp) => {
          if (resp.approved === 1) {
            history.push("/")
          } else {
            logout()
          }
        }))
  }

  const handleControlledInputChange = (event) => {
    newPost[event.target.name] = event.target.id
  }

  // const handleControlledCheckChange = (event) => {
  //   if (event.target.checked === true) {
  //     newPost[event.target.name] += (event.target.id)
  //   } else {
  //     newPost[event.target.name] -= (event.target.id)
  //   }
  // }

  const { quiz, getQuiz } = useContext(QuizContext);

  useEffect(() => {
    getQuiz();
  }, [])

  const QuestionCard = ({ question }) => {

    const questionCard = (q) => {
      if (q.questionType.name === "MultipleChoice") {
        return (<>
          <fieldset id={q.id}>
            <div>{q.content}</div>
            {q.answers.map((a) => {
              return (<>
                <input type="radio" value={a.id} name={q.id} id={a.id} required
                  onChange={(e) => { handleControlledInputChange(e) }}></input>
                <label htmlFor={a.id}>{a.content}</label><br />
              </>)
            })}
          </fieldset>
        </>
        )
      } else if (q.questionType.name === "TrueFalse") {
        return (<>
          <fieldset id={q.id}>
            <div>{q.content}</div>
            {q.answers.map((a) => {
              return (<>
                <input type="radio" value={a.id} name={q.id} id={a.id} required
                  onChange={(e) => { handleControlledInputChange(e) }}></input>
                <label htmlFor={a.id}>{a.content}</label><br />
              </>)
            })}
          </fieldset>
        </>
        )
      }
      // else if (q.questionType.name === "MultipleAnswer") {
      //   return (<>
      //     <fieldset id={q.id}>
      //       <div>{q.content}</div>
      //       {q.answers.map((a) => {
      //         return (<>
      //           <input type="checkbox" class="check" value={a.id} name={q.id} id={a.id}
      //             onChange={(e) => { handleControlledCheckChange(e) }}
      //             defaultChecked={false}></input>
      //           <label htmlFor={a.id}>{a.content}</label><br />
      //         </>)
      //       })}
      //     </fieldset>
      //   </>
      //   )
      // }
    }

    return (
      <>
        { questionCard(question)}
      </>
    )
  }

  return (
    <form>
      {quiz.map((q) => (
        <fieldset className="m-4" key={q.id}>
          <QuestionCard key={q.id} question={q} />
        </fieldset>
      ))}
      <button onClick={(e) => { handleSubmitQuiz(e) }}>Submit Quiz</button>
    </form>
  )
}

export default Quiz;