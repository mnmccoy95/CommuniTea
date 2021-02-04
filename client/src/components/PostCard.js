import React, { useContext, useState } from "react";
import { Card, Button, ButtonGroup, Form, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TagList from "./TagList"
import { PostContext } from "../providers/PostProvider"
import "../pages/Discover.css"
import InspirationButton from "./InspirationButton"
import RemoveInspBtn from "./RemoveInspBtn"
import "./PostCard.css"


const PostCard = ({ post }) => {
  const { updatePost, deletePost } = useContext(PostContext);
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [postEdits, setPostEdits] = useState("");

  const showEditForm = () => {
    setIsEditing(true);
    setPostEdits(post.context);
  };

  const hideEditForm = () => {
    setIsEditing(false);
    setPostEdits("");
  };

  const createEditPost = () => {
    post.context = postEdits;
  };

  const EditButton = () => {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    if (post.authorId === user.id) {
      return (
        <>
          <ButtonGroup size="sm">
            <Button className="btn btn-primary ownerBtns pinkBtn" onClick={showEditForm}>
              Edit
            </Button>
            <Button
              className="btn dangerBtn ownerBtns"
              onClick={(e) => setPendingDelete(true)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </>
      )
    } else {
      return null
    }
  }

  const inspChecker = () => {
    if (window.location.href.includes("inspiration")) {
      return (<RemoveInspBtn id={post.id} />)
    } else {
      return (<InspirationButton id={post.id} />)
    }
  }

  return (
    <Card className="col postContainer">
      <div className="postHeader">
        <img className="userImage" src={post.authorImg} alt={post.authorName}></img>
        <p className="userName">{post.authorName}</p>
      </div>
      <div>
        <img className="postImage" src={post.imageLocation} alt={post.authorName}></img>
      </div>
      <div className="context-container">
        {isEditing ? (
          <Form className="w-100 h-100">
            <InputGroup>
              <Input
                rows="10"
                columns="60"
                type="textarea"
                className="postTextEdit"
                onChange={(e) => setPostEdits(e.target.value)}
                value={postEdits}
              />
              <ButtonGroup size="sm">
                <Button
                  type="button"
                  className="ownerBtns pinkBtn"
                  onClick={(e) => {
                    createEditPost();
                    updatePost(post)
                    hideEditForm()
                  }}>Save</Button>
                <Button className="ownerBtns cancelBtn" onClick={hideEditForm}>
                  Cancel
              </Button>
              </ButtonGroup>
            </InputGroup>
          </Form>
        ) : (
            <>
              <p className="postText">{post.context}</p>
              {EditButton()}
            </>
          )}
      </div>
      <div className="postFooter">
        <TagList tags={post.postTag} />
        {inspChecker()}
      </div>
      {/* DELETE CONFIRM MODAL */}
      <Modal isOpen={pendingDelete}>
        <ModalHeader>Delete post?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button className="cancelBtn" onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
          <Button className="btn dangerBtn" onClick={(e) => {
            deletePost(post)
            setPendingDelete(false);
            Modal.isOpen = { pendingDelete }
          }}>Yes, Delete</Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default PostCard;