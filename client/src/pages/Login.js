import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

const Login = () => {
  const { login, getCurrentUser } = useContext(UserProfileContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login(email, password)
      .then((user) => {
        setLoading(false);
        if (user.approved === 2) {
          history.push("/quiz")
        } else {
          history.push("/");
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="login-form new-post-form-container" >
      <form onSubmit={handleSubmit} className="new-post-form-area">
        <h2 className="text-center">Login</h2>
        <div className="form-group">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required="required"
          />
        </div>
        <div className="form-group submitContainer">
          <Button type="submit" className="dangerBtn btn" disabled={loading}>
            Sign in
          </Button>
        </div>
        <div className="text-center small">
          Don't have an account?
          <div>
            <Link to="/register">Sign up here</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;