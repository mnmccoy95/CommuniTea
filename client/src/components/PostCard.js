import React, { useContext } from "react";
import { Card } from "reactstrap";
import { useHistory } from "react-router-dom";
import TagList from "./TagList"
import { UserProfileContext } from "../providers/UserProfileProvider"

const PostCard = ({ post }) => {
  const { getCurrentUser } = useContext(UserProfileContext);
  const user = getCurrentUser();
  const history = useHistory();

  const directToEdit = () => {
    history.push(`/editpost/${post.id}`)
  }

  const EditButton = () => {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    if (post.authorId === user.id) {
      return (
        <div className="ml-5 edit-post-button" onClick={() => { directToEdit() }}>EDIT</div>
      )
    } else {
      return null
    }
  }

  return (
    <Card>
      <div>
        <div>
          <p>{post.authorName}</p>
          <EditButton />
        </div>
        <div>
          <img src={post.imageLocation} alt={post.authorName}></img>
        </div>
        <div>
          <p>{post.context}</p>
        </div>
        <div>
          <TagList tags={post.postTag} />
        </div>
      </div>
    </Card>
  );
};

export default PostCard;