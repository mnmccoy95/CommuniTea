import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { toast } from "react-toastify";

const Register = () => {
  const { register } = useContext(UserProfileContext);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const history = useHistory();

  const [imageLoading, setImageLoading] = useState(false)


  const uploadImage = async e => {
    const files = e.target.files
    setImageLoading(true)
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'vugr9ics')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dddadzenw/image/upload/',
      {
        method: "POST",
        body: data
      }
    )
    const file = await res.json()
    let image = file.secure_url
    localStorage.setItem("image", image)

    setImageLoading(false)
    const matches = document.querySelectorAll(".hidden");
    for (const m of matches) {
      m.style.display = "block"
    }
    const submit = document.querySelector(".submitContainer");
    submit.style.display = "flex"
    document.querySelector(".notHidden").style.display = "none"
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords don't match!");
      return;
    }

    setLoading(true);
    const imageLocation = localStorage.getItem("image")
    const profile = {
      displayName,
      email,
      imageLocation,
      pronouns,
      bio
    };
    register(profile, password)
      .then((user) => {
        setLoading(false);
        history.push("/quiz");
        localStorage.removeItem("image")
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="login-form new-post-form-container">
      <form onSubmit={handleSubmit} className="new-post-form-area">
        <h2 className="text-center">Register</h2>
        <div className="form-group uploadForm">
          <div className='defaultImageContainer'>
            <img className='defaultImage-register' src={localStorage.image ? localStorage.image : 'https://build.dfomer.com/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default.jpg'} />
          </div>

          {imageLoading ? (
            <h6 className="loadingImage">Loading...</h6>
          ) : <></>}


          <br />
          <label htmlFor="embedpollfileinput" className="btn dangerBtn notHidden uploadButton">
            Upload image
          </label>
          <input hidden type="file" onChange={uploadImage} className="inputfile" id="embedpollfileinput" />
        </div>
        <div className="form-group hidden">
          <Input
            onChange={(e) => setDisplayName(e.target.value)}
            type="text"
            className="form-control"
            name="displayName"
            placeholder="Display Name"
            required="required"
          />
        </div>
        <div className="form-group hidden">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            required="required"
          />
        </div>
        <div className="form-group hidden">
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required="required"
          />
        </div>
        <div className="form-group hidden">
          <Input
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="Confirm Password"
            required="required"
          />
        </div>
        <div className="form-group hidden">
          <Input
            onChange={(e) => setPronouns(e.target.value)}
            type="text"
            className="form-control"
            name="pronouns"
            placeholder="Pronouns"
            required="required"
          />
        </div>
        <div className="form-group hidden">
          <Input
            onChange={(e) => setBio(e.target.value)}
            type="textarea"
            className="form-control"
            name="bio"
            rows="5"
            placeholder="Bio"
            required="required"
          />
        </div>
        <div className="form-group hidden submitContainer">
          <Button type="submit" className="submitNewPostBtn dangerBtn btn" disabled={loading}>
            Sign Up
          </Button>
        </div>
        <div className="text-center small">
          Already have an account?
          <div>
            <Link to="/login">Log in here</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;