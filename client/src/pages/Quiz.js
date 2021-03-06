import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { QuizContext } from "../providers/QuizProvider"
import { UserProfileContext } from "../providers/UserProfileProvider"
import WindowChecker from "../utils/WindowChecker";
import { toast } from "react-toastify";

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
            localStorage.setItem("userProfile", JSON.stringify(resp))
            history.push("/discover")
            window.location.reload()

          } else {
            logout()
            toast.error("User not approved.");
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
    window.scrollTo(0, 0)
    WindowChecker()
    getQuiz();
  }, [])

  const QuestionCard = ({ question }) => {

    const questionCard = (q) => {
      if (q.questionType.name === "MultipleChoice") {
        return (<>
          <fieldset className="questionBox" id={q.id}>
            <div className="form-group">
              <div className="questionTitle">{q.content}</div>
              {q.answers.map((a) => {
                return (<>
                  <input type="radio" className="quizAnswer" value={a.id} name={q.id} id={a.id} required="required"
                    onChange={(e) => { handleControlledInputChange(e) }}></input>
                  <label htmlFor={a.id}>{a.content}</label><br />
                </>)
              })}
            </div>
          </fieldset>
        </>
        )
      } else if (q.questionType.name === "TrueFalse") {
        return (<>
          <fieldset className="questionBox" id={q.id}>
            <div className="form-group">
              <div className="questionTitle">{q.content}</div>
              {q.answers.map((a) => {
                return (<>
                  <input type="radio" className="quizAnswer" value={a.id} name={q.id} id={a.id} required="required"
                    onChange={(e) => { handleControlledInputChange(e) }}></input>
                  <label htmlFor={a.id}>{a.content}</label><br />
                </>)
              })}
            </div>
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
    <section className="new-post-form-container">
      <div className="new-post-form-area">
        <h2 className="new-post-form-title">Quiz Time!</h2>
        <Link className="rules-link" to="/rules">Check out the community rules here.</Link>
        <div className="instruction-container">
          <div>This quiz MUST be completed AND passed 100% before you can join.</div>
          <br />
          <div className="one-chance">You only get one chance!</div>
        </div>
        <form className="quiz-form">
          {quiz.map((q) => (

            <QuestionCard key={q.id} question={q} />

          ))}
          <button className="btn btn-quiz-submit" onClick={(e) => { handleSubmitQuiz(e) }}>Submit Quiz</button>
        </form>
      </div>
    </section>
  )
}

export default Quiz;