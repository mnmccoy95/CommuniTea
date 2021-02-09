import React, { useContext, useState } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider"
import { CommentContext } from "../providers/CommentProvider"
import { Link } from "react-router-dom"
import { Card, Button, ButtonGroup, Form, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { StyleContext } from "../providers/StyleProvider"

const CommentList = ({ comments, postId }) => {
  const { style } = useContext(StyleContext);
  const [commentToAdd, setCommentToAdd] = useState("");
  const userProfileId = parseInt(JSON.parse(localStorage.getItem('userProfile')).id);
  const [loading, setLoading] = useState(false);
  const { getToken } = useContext(UserProfileContext)
  const [commentList, setCommentList] = useState(comments)
  const { updateComment } = useContext(CommentContext);
  const [showComments, setShowComments] = useState(false);


  const handleNewComment = (event) => {
    const newComment = [];
    newComment[event.target.name] = event.target.value
    setCommentToAdd(newComment)
  }

  const submitNewComment = (e) => {
    e.preventDefault();
    setLoading(true)
    const content = commentToAdd.content;
    const comment = {
      userProfileId,
      postId,
      content
    }
    getToken().then((token) => {
      fetch(`/api/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      }).then((res) => res.json()).then(setCommentList)
    })
    const matches = document.querySelectorAll(".newCommentField");
    for (const m of matches) {
      m.value = ""
    }
    setShowComments(true)
  }

  const commentChecker = () => {
    if (comments.length < 1) {
      return null;
    }
    if (comments && showComments === true) {
      return (<>
        <div className="commentList">
          {commentList.map((c) => (
            <div className="comment" key={c.id}>
              <Comment comment={c} />
            </div>
          ))}
        </div>
        <Button onClick={(e) => { setShowComments(false) }} color="link" size="sm" className={`cancelBtn${style.child}`}>Hide Comments</Button>
      </>
      )
    } else if (comments && showComments === false) {
      return (<Button onClick={(e) => { setShowComments(true) }} color="link" size="sm" className={`cancelBtn${style.child}`}>Show Comments</Button>)
    }
  }

  const Comment = ({ comment }) => {
    const [editing, setEditing] = useState(false);
    const [possibleDelete, setPossibleDelete] = useState(false);
    const [commentEdits, setCommentEdits] = useState("");

    const showEditForm = () => {
      setEditing(true);
      setCommentEdits(comment.content);
    };

    const hideEditForm = () => {
      setEditing(false);
      setCommentEdits("");
    };

    const createEditComment = () => {
      comment.content = commentEdits;
    };

    const EditButton = () => {
      const user = JSON.parse(localStorage.getItem('userProfile'));
      if (comment.userProfileId === user.id) {
        return (
          <>
            <ButtonGroup size="sm" className="commentBtns">
              <Button className={`btn btn-primary ownerBtns pinkBtn${style.child}`} onClick={showEditForm}>
                Edit
            </Button>
              <Button
                className={`btn dangerBtn${style.child} ownerBtns`}
                onClick={(e) => setPossibleDelete(true)}
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

    const handleDelete = (comment) => {
      getToken().then((token) => {
        fetch(`/api/comment/${comment.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()).then(setCommentList)
      })

    }

    return (
      <Card className={`commentContainer${style.child}`}>
        <div className="context-container">
          {editing ? (
            <Form className="w-100 h-100">
              <InputGroup>
                <Input
                  rows="3"
                  columns="60"
                  type="textarea"
                  className="commentTextEdit"
                  onChange={(e) => setCommentEdits(e.target.value)}
                  value={commentEdits}
                />
                <ButtonGroup size="sm">
                  <Button
                    type="button"
                    className={`ownerBtns pinkBtn${style.child}`}
                    onClick={(e) => {
                      createEditComment();
                      updateComment(comment)
                      hideEditForm()
                    }}>Save</Button>
                  <Button className={`ownerBtns cancelBtn${style.child}`} onClick={hideEditForm}>
                    Cancel
              </Button>
                </ButtonGroup>
              </InputGroup>
            </Form>
          ) : (
              <>
                <div className={`commentInfo${style.child}`}>
                  <div className="commentOwner"><Link className={`userName${style.child}`} to={`/profile/${comment.userProfileId}`}>{comment.userProfile.displayName}:</Link>{EditButton()}</div>
                  <p className={`commentText${style.child}`}>{comment.content}</p>

                </div>
              </>
            )}
        </div>
        {/* DELETE CONFIRM MODAL */}
        <Modal isOpen={possibleDelete}>
          <ModalHeader>Delete comment?</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this comment? This action cannot be
            undone.
        </ModalBody>
          <ModalFooter>
            <Button className={`cancelBtn${style.child}`} onClick={(e) => setPossibleDelete(false)}>No, Cancel</Button>
            <Button className={`btn dangerBtn${style.child}`} onClick={(e) => {
              handleDelete(comment)
              setPossibleDelete(false);
              Modal.isOpen = { possibleDelete }
            }}>Yes, Delete</Button>
          </ModalFooter>
        </Modal>
      </Card>
    );
  }

  return (
    <>
      {commentChecker()}
      <Form className="w-100 h-100">
        <InputGroup>
          <Input
            rows="2"
            columns="60"
            type="textarea"
            name="content"
            className="newCommentField"
            placeholder="Write a comment..."
            onChange={(e) => handleNewComment(e)}
          />
          <ButtonGroup size="sm">
            <Button
              type="button"
              disabled={loading}
              className={`ownerBtns pinkBtn${style.child} commentBtn`}
              onClick={(e) => {
                submitNewComment(e)
              }}>Comment</Button>
          </ButtonGroup>
        </InputGroup>
      </Form>
    </>
  );
};

export default CommentList;