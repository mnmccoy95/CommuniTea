import React, { useContext } from "react";
import { Button } from "reactstrap"
import { InspirationContext } from "../providers/InspirationProvider";
import { UserProfileContext } from "../providers/UserProfileProvider"
import "./PostCard.css"

const RemoveInspBtn = ({ id }) => {
  const { deleteInspiration } = useContext(InspirationContext);
  const { getCurrentUser } = useContext(UserProfileContext);
  const user = getCurrentUser();


  const deleteInsp = (event) => {
    const postId = parseInt(event.target.id)
    deleteInspiration(postId)
  }

  return (
    <div>
      <button id={id} onClick={(e) => { deleteInsp(e) }} className="removeInsp btn btn-lg"><i id={id} className="fas fa-heart fa-2x"></i></button>
    </div>
  );
};

export default RemoveInspBtn;