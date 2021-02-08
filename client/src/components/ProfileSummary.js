import React, { useContext } from "react"
import { StyleContext } from "../providers/StyleProvider"
import MyProfile from "../pages/MyProfile"
import { Col } from "reactstrap"

const ProfileSummary = ({ profileSummary }) => {
  const { style } = useContext(StyleContext);
  const userProfileId = parseInt(JSON.parse(localStorage.getItem('userProfile')).id);

  const ownerCheck = () => {
    if (parseInt(profileSummary.id) === userProfileId) {
      return (<MyProfile />)
    }
  }

  return (<>
    <Col xs="auto">
      <div className={`profileSummary${style.child}`}>
        <div className={`profileHeader${style.child}`}>
          <img className="userImage" src={profileSummary.imageLocation} alt={`${profileSummary.displayName} image`}></img>
          <div>{profileSummary.displayName}</div>
        -
        <div>{profileSummary.pronouns}</div>
        </div>
        <p className="bioContainer">
          {profileSummary.bio}
        </p>
        {ownerCheck()}
      </div>
    </Col>
  </>
  )
}

export default ProfileSummary;