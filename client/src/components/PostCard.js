import React, { useContext, useState } from "react";
import { Card, Button, ButtonGroup, Form, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useHistory } from "react-router-dom";
import TagList from "./TagList"
import { UserProfileContext } from "../providers/UserProfileProvider"
import { PostContext } from "../providers/PostProvider"
import "../pages/Discover.css"

const PostCard = ({ post }) => {
  const { getCurrentUser } = useContext(UserProfileContext);
  const { updatePost, deletePost } = useContext(PostContext);
  const user = getCurrentUser();
  const history = useHistory();
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
            <Button className="btn btn-primary" onClick={showEditForm}>
              Edit
            </Button>
            <Button
              className="btn btn-danger"
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

  return (
    <Card>
      <div>
        <div>
          <p>{post.authorName}</p>
        </div>
        <div>
          <img className="postImage" src={post.imageLocation} alt={post.authorName}></img>
        </div>
        <div>
          {isEditing ? (
            <Form className="w-100">
              <InputGroup>
                <Input
                  bsSize="sm"
                  onChange={(e) => setPostEdits(e.target.value)}
                  value={postEdits}
                />
                <ButtonGroup size="sm">
                  <Button onClick={(e) => {
                    createEditPost();
                    updatePost(post)
                    hideEditForm()
                  }}>Save</Button>
                  <Button outline color="danger" onClick={hideEditForm}>
                    Cancel
              </Button>
                </ButtonGroup>
              </InputGroup>
            </Form>
          ) : (
              <>
                {post.context}
                {EditButton()}
              </>
            )}
        </div>
        <div>
          <TagList tags={post.postTag} />
        </div>
      </div>
      {/* DELETE CONFIRM MODAL */}
      <Modal isOpen={pendingDelete}>
        <ModalHeader>Delete post?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
          <Button className="btn btn-outline-danger" onClick={(e) => {
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