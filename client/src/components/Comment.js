import React, { useContext, useState } from "react"
import { Card, Button, ButtonGroup, Form, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { StyleContext } from "../providers/StyleProvider"
import { CommentContext } from "../providers/CommentProvider"
import { UserProfileContext } from "../providers/UserProfileProvider"

const Comment = ({ comment, comments }) => {
  const { style } = useContext(StyleContext);
  const { updateComment, deleteComment, getCommentsByPostId } = useContext(CommentContext);
  const [editing, setEditing] = useState(false);
  const [possibleDelete, setPossibleDelete] = useState(false);
  const [commentEdits, setCommentEdits] = useState("");
  const [commentList, setCommentList] = useState(comments)
  const { getToken } = useContext(UserProfileContext)

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
          <ButtonGroup size="sm">
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
    <Card className={`col commentContainer${style.child}`}>
      <div className="context-container">
        {editing ? (
          <Form className="w-100 h-100">
            <InputGroup>
              <Input
                rows="10"
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
              <p className="commentText">{comment.content}</p>
              {EditButton()}
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

export default Comment;