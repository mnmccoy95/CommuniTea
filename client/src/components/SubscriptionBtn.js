import React, { useContext, useEffect } from "react";
import { SubContext } from "../providers/SubProvider";
import { UserProfileContext } from "../providers/UserProfileProvider"
import { StyleContext } from "../providers/StyleProvider"

const SubscriptionButton = ({ post }) => {
  const { rawSubs, getSubList, addSub, deleteSub, loading } = useContext(SubContext);
  const { getCurrentUser } = useContext(UserProfileContext);
  const { style } = useContext(StyleContext);
  const user = getCurrentUser();

  useEffect(() => {
    getSubList()
  }, [])

  const addSubscription = (event) => {
    const providerUserProfileId = parseInt(event.target.id)
    const subscriberUserProfileId = parseInt(user.id)
    const sub = {
      providerUserProfileId, subscriberUserProfileId
    }
    addSub(sub)
  }

  const deleteSubscription = (event) => {
    const providerUserProfileId = parseInt(event.target.id)
    const subscriberUserProfileId = parseInt(user.id)
    deleteSub(providerUserProfileId, subscriberUserProfileId)
  }

  const subChecker = () => {
    const subExist = rawSubs.map((s) => { return s.providerUserProfileId })
    if (subExist.includes(post.authorId)) {
      return (<button id={post.authorId} className={`cancelBtn${style.child} btn`} onClick={(e) => { deleteSubscription(e) }} disabled={loading}>Unsubscribe</button>)
    } else {
      return (<button id={post.authorId} className={`dangerBtn${style.child} btn`} onClick={(e) => { addSubscription(e) }} disabled={loading}>Subscribe</button>)
    }
  }

  return (
    <div className="subBtn">
      {subChecker()}
    </div>
  );
};

export default SubscriptionButton;