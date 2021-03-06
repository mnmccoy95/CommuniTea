import React, { useContext, useEffect, useState } from "react";
import { InspirationContext } from "../providers/InspirationProvider";
import { UserProfileContext } from "../providers/UserProfileProvider"
import { StyleContext } from "../providers/StyleProvider"

const InspirationButton = ({ id }) => {
  const { inspiration, getInspirationByUser, addInspiration, deleteInspiration, loading } = useContext(InspirationContext);
  const { getCurrentUser } = useContext(UserProfileContext);
  const { style } = useContext(StyleContext);
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
      return (<button id={id} onClick={(e) => { deleteInsp(e) }} className={`removeInsp${style.child} btn btn-lg`} disabled={loading}><i id={id} className="fas fa-heart fa-2x"></i></button>)
    } else {
      return (<button id={id} onClick={(e) => { addInsp(e) }} className={`addInsp${style.child} btn btn-lg`} disabled={loading}><i id={id} className="fas fa-heart fa-2x"></i></button>)
    }
  }

  return (
    <div>
      {inspChecker()}
    </div>
  );
};

export default InspirationButton;