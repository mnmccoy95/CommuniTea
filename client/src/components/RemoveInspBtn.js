import React, { useContext } from "react";
import { InspirationContext } from "../providers/InspirationProvider";
import { UserProfileContext } from "../providers/UserProfileProvider"
import { StyleContext } from "../providers/StyleProvider"

const RemoveInspBtn = ({ id }) => {
  const { deleteInspiration, loading } = useContext(InspirationContext);
  const { getCurrentUser } = useContext(UserProfileContext);
  const { style } = useContext(StyleContext);
  const user = getCurrentUser();


  const deleteInsp = (event) => {
    const postId = parseInt(event.target.id)
    deleteInspiration(postId)
  }

  return (
    <div>
      <button id={id} onClick={(e) => { deleteInsp(e) }} className={`removeInsp${style.child} btn btn-lg`} disabled={loading}><i id={id} className="fas fa-heart fa-2x"></i></button>
    </div>
  );
};

export default RemoveInspBtn;