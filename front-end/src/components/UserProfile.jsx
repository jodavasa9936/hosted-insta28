import { useState, useEffect } from "react";
import "../css/Profile.css";
import { PostDetail } from "./PostDetail";
import { useParams } from "react-router-dom";

export function UserProfile() {
    var picLink = "https://cdn-icons-png.flaticon.com/128/456/456283.png"
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  /* to follow user */
  const followUser = (userId) => {
    fetch(`${import.meta.env.VITE_API}/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
  };

  /* to follow user */
  const unFollowUser = (userId) => {
    fetch(`${import.meta.env.VITE_API}/unfollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/user/${userid}`, {
      headers: {
        "x-access-token": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUser(result.user);
        setPosts(result.posts);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [isFollow]);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
          <img src={user.Photo ? user.Photo : picLink} alt="" />
        </div>
        {/* profile-data */}
        <div className="profile-data">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>{user.name}</h1>
            <button
              className="followBtn"
              onClick={() => {
                if (isFollow) {
                  unFollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{posts.length} posts</p>
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
        {posts.map((post) => {
          return (
            <img
              key={post._id}
              src={post.photo}
              /*               onClick={() => {
                toggleDetails(pic);
              }} */
              className="item"
            ></img>
          );
        })}
      </div>
      {/* {show && <PostDetail item={posts} toggleDetails={toggleDetails} />} */}
    </div>
  );
}
