import { useState, useEffect } from "react";
import "../css/Profile.css";
import { PostDetail } from "../components/PostDetail.jsx";
import { ProfilePic } from "../components/ProfilePic.jsx";
import { useNavigate } from "react-router-dom";

export function Profile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/456/456283.png";

  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
      console.log("hide");
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API}/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          "x-access-token": localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPic(result.posts);
        setUser(result.user);
      });
  }, []);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
          <img
            style={{ cursor: "pointer" }}
            onClick={changeprofile}
            src={user.Photo ? user.Photo : picLink}
            alt=""
          />
        </div>
        {/* profile-data */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{pic ? pic.length : "0"} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90%",
          margin: "auto",
          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      {/* Gallery */}
      <div className="gallery">
        {pic.map((pic) => {
          return (
            <img
              key={pic._id}
              src={pic.photo}
              onClick={() => {
                toggleDetails(pic);
              }}
              className="item"
            ></img>
          );
        })}
      </div>
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {changePic && <ProfilePic changeprofile={changeprofile} />}
    </div>
  );
}
