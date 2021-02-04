import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap"
import { InspirationContext } from "../providers/InspirationProvider";
import { UserProfileContext } from "../providers/UserProfileProvider"
import "./PostCard.css"


const InspirationButton = ({ id }) => {
  const { inspiration, getInspirationByUser, addInspiration, deleteInspiration } = useContext(InspirationContext);
  const { getCurrentUser } = useContext(UserProfileContext);
  const user = getCurrentUser();

  useEffect(() => {
    getInspirationByUser()
  }, [])

  const addInsp = (event) => {
    const postId = parseInt(event.target.id)
    const userProfileId = parseInt(user.id)
    const insp = {
      postId, userProfileId
    }
    addInspiration(insp)
  }

  const deleteInsp = (event) => {
    const postId = parseInt(event.target.id)
    deleteInspiration(postId)
  }

  const inspChecker = () => {
    const inspExist = inspiration.map((i) => { return i.id });
    if (inspExist.includes(id)) {
      return (<button id={id} onClick={(e) => { deleteInsp(e) }} class="btn btn-secondary"><i class="fas fa-heart"></i></button>)
    } else {
      return (<button id={id} onClick={(e) => { addInsp(e) }} class="btn btn-danger"><i class="fas fa-heart"></i></button>)
    }
  }

  return (
    <div>
      {inspChecker()}
    </div>
  );
};

export default InspirationButton;