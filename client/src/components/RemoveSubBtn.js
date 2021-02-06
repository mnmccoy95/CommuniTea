import React, { useContext } from "react";
import { SubContext } from "../providers/SubProvider";
import { UserProfileContext } from "../providers/UserProfileProvider"
import { StyleContext } from "../providers/StyleProvider"

const RemoveSubBtn = ({ post }) => {
  const { deleteSub } = useContext(SubContext);
  const { getCurrentUser } = useContext(UserProfileContext);
  const { style } = useContext(StyleContext);
  const user = getCurrentUser();

  const deleteSubscription = (event) => {
    const providerUserProfileId = parseInt(event.target.id)
    const subscriberUserProfileId = parseInt(user.id)
    deleteSub(providerUserProfileId, subscriberUserProfileId)
  }

  const subChecker = () => {
    return (<button id={post.authorId} className={`cancelBtn${style.child} btn`} onClick={(e) => { deleteSubscription(e) }}>Unsubscribe</button>)
  }

  return (
    <div className="subBtn">
      {subChecker()}
    </div>
  );
};

export default RemoveSubBtn;