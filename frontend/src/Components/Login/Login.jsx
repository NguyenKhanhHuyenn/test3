import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in...');
    const newUser = {
      username: username,
      pass: password
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <div className="wrapper">
      <div className="container main">
        <div className="row row-login">
          <div className="col-md-6 side-image">
            <div className="text">
              {/* <p>Internship management system</p> */}
            </div>
          </div>
          <div className="col-md-6 right">
            <div className="input-box">
              <header className="header-login">Đăng nhập</header>
              <div className="input-field">
                <input
                  type="text"
                  className="input"
                  id="username"
                  required=""
                  autoComplete="off"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <label htmlFor="username">username</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="input"
                  id="pass"
                  required=""
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor="pass">Password</label>
              </div>

              <div className="input-field" onSubmit={handleLogin}>
                <input
                  onClick={handleLogin}
                  type="submit"
                  className="submit"
                  value="Đăng nhập"
                />
              </div>
              <div className="signin">
                <span>
                  <Link to="/">Quay lại trang chủ</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
