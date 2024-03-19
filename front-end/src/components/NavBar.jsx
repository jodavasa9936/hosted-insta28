import logo from "../img/Instagram_logo.svg.png";
import React, { useContext } from "react";

import "../css/NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export function NavBar({ login }) {
  const navigate = useNavigate();
  const { setModalOpen } = useContext(LoginContext);

  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/profile" key="link-profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost" key="link-createPost">Create Post</Link>
          <Link style={{ marginLeft: "20px" }} key="link-following" to="/followingpost">
            My Following
          </Link>
          <Link to={""}>
            <button className="primaryBtn" key="link-logout" onClick={() => setModalOpen(true)}>
              Log Out
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup" key="link-signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin" key="link-signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/" key="link-home-mobile">
            <li>
              <span className="material-icons-outlined">home</span>
            </li>
          </Link>
          <Link to="/profile"  key="link-profile-mobile">
            <li>
              <span className="material-icons-outlined">account_circle</span>
            </li>
          </Link>
          <Link to="/createPost" key="link-createPost-mobile">
            <li>
              <span className="material-icons-outlined">add_box</span>
            </li>
          </Link>
          <Link style={{ marginLeft: "20px" }} to="/followingpost" key="link-following-mobile">
            <li>
              <span className="material-icons-outlined">explore</span>
            </li>
          </Link>
          <Link to={""} key="link-logout-mobile">
            <li onClick={() => setModalOpen(true)}>
              <span className="material-icons-outlined">logout</span>
            </li>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup" key="link-signup-mobile">
            <li>SignUp</li>
          </Link>
          <Link to="/signin" key="link-signin-mobile">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  return (
    <div className="navbar">
      <img
        id="insta-logo"
        src={logo}
        alt=""
        onClick={() => {
          navigate("/");
        }}
      />
      <ul className="nav-menu" key="desktop">{loginStatus()}</ul>
      <ul className="nav-mobile" key="mobile">{loginStatusMobile()}</ul>
    </div>
  );
}
