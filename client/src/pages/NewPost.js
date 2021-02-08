import React, { useEffect, useState, useContext } from "react";
import { TagContext } from "../providers/TagProvider"
import { UserProfileContext } from "../providers/UserProfileProvider"
import { useHistory } from "react-router-dom";
import WindowChecker from "../utils/WindowChecker";
import { Typeahead } from 'react-bootstrap-typeahead';
import { FormGroup, Input } from "reactstrap"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { PostTagContext } from "../providers/PostTagProvider"
import { StyleContext } from "../providers/StyleProvider"

const NewPost = () => {
  const { tags, getTags } = useContext(TagContext);
  const { getToken } = useContext(UserProfileContext);
  const { addPostTag } = useContext(PostTagContext);
  const { style } = useContext(StyleContext);
  const [multiSelections, setMultiSelections] = useState([]);
  const [post, setPost] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    WindowChecker()
    getTags();
  }, []);

  const [imageLoading, setImageLoading] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    setImageLoading(true)
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'z0vejl5n')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dddadzenw/image/upload',
      {
        method: "POST",
        body: data
      }
    )
    const file = await res.json()
    let image = file.secure_url
    const newImage = localStorage.setItem("image", image);

    setImageLoading(false)
    const matches = document.querySelectorAll(".hidden");
    for (const m of matches) {
      m.style.display = "inline-block"
    }
    document.querySelector(".notHidden").style.display = "none"
  }

  const submitPost = (post) => {
    setLoading(true)
    getToken().then((token) => {
      fetch(`/api/post`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
      })
        .then((res) => res.json())
        .then((res) => {
          for (const tag of multiSelections) {
            const postId = res.id;
            const tagId = tag.id;
            const postTag = {
              postId,
              tagId
            };
            addPostTag(postTag)
          }
        })
        .then((data) => {
          history.push(`/discover`)
          setLoading(false)
        })
        .then(localStorage.removeItem("image"))
    })
  }

  const handleControlledInputChange = (event) => {
    const newPost = { ...post }
    newPost[event.target.name] = event.target.value
    setPost(newPost)
  }

  const handleClickSubmitPost = (event) => {
    event.preventDefault()
    post.imageLocation = localStorage.getItem("image");

    const user = JSON.parse(localStorage.getItem('userProfile'));
    if (user == null) {
      history.push("/login")
    }
    else {
      submitPost(post)
    }
  }



  return (
    <section className={`new-post-form-container new-post-form-container${style.child}`}>
      <div className={`new-post-form-area${style.child} new-post-form-area`}>
        <h2 className="new-post-form-title">Create A New Post</h2>
        <form id="newPostForm" onSubmit={(e) => { handleClickSubmitPost(e) }}>
          <fieldset>
            <div className="form-group uploadForm">
              <div className='defaultImageContainer'>
                <img className='defaultImage' src={localStorage.image ? localStorage.image : 'https://build.dfomer.com/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default.jpg'} />
              </div>
              {imageLoading ? (
                <h6 className="loadingImage">Loading...</h6>
              ) : <></>}
              <br />
              <label htmlFor="embedpollfileinput" className={`btn btn-info notHidden uploadButton dangerBtn${style.child}`}>
                Upload image
              </label>
              <input hidden type="file" onChange={uploadImage} className="inputfile" id="embedpollfileinput" />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group hidden w-100 h-100">
              <FormGroup>
                <label className="new-post-label" htmlFor="newBody"></label>
                <Input type="textarea" rows="10" className="newBody w-100 h-100" id="content" name="content" placeholder="Tell us more!" onChange={(e) => { handleControlledInputChange(e) }} required autoFocus />
              </FormGroup>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group hidden w-100 h-100">
              <FormGroup>
                <Typeahead
                  id="basic-typeahead-multiple"
                  labelKey="name"
                  multiple
                  onChange={setMultiSelections}
                  options={tags}
                  placeholder="Choose tags..."
                  selected={multiSelections}
                />
              </FormGroup>
            </div>
          </fieldset>
          <fieldset className="hidden submitContainer">
            <button className={`submitNewPostBtn hidden btn dangerBtn${style.child}`} type="submit" disabled={loading}> Submit Post </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default NewPost;