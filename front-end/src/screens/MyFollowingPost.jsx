import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/Home.css";

export function MyFollowingPost() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  //Toast function
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup");
    }

    fetch(`${import.meta.env.VITE_API}/myfollowingpost`, {
      headers: {
        "x-access-token": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  /* to show and hide comments */
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
      console.log("hide");
    } else {
      setShow(true);
      setItem(posts);
      console.log(item);
    }
  };

  const likePost = (id) => {
    fetch(`${import.meta.env.VITE_API}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  const unlikePost = (id) => {
    fetch(`${import.meta.env.VITE_API}/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  /* function to make comment */
  const makeComment = (text, id) => {
    fetch(`${import.meta.env.VITE_API}/comment`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        notifyB("Comment posted");
        console.log(result);
      });
  };

  return (
    <div className="Home">
      {/* card */}
      {data.map((posts) => {
        return (
          <div className="card" key={posts._id}>
            {/* card header */}
            <div className="card-header">
              <div className="card-pic">
                <img
                  src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww"
                  alt=""
                />
              </div>

              <h5>
                <Link to={`/profile/${posts.postedBy._id}`}>
                  {posts.postedBy.name}
                </Link>
              </h5>
            </div>

            {/* card image */}
            <div className="card-image">
              <img src={posts.photo} alt="" />
            </div>

            {/* card content */}
            <div className="card-content">
              {/* https://www.youtube.com/watch?v=XMdZnJ1hzPo */}
              {posts.likes.includes(
                JSON.parse(localStorage.getItem("user"))._id
              ) ? (
                <span
                  className="material-icons-outlined material-icons-outlined-red"
                  onClick={() => {
                    unlikePost(posts._id);
                  }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-icons-outlined"
                  onClick={() => {
                    likePost(posts._id);
                  }}
                >
                  favorite_border
                </span>
              )}

              <p>{posts.likes.length} likes</p>
              <p>{posts.body}</p>
              <p
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  toggleComment(posts);
                }}
              >
                View all comments
              </p>
            </div>

            {/* add comment */}
            <div className="add-comment">
              <span className="material-icons-outlined">emoji_emotions</span>
              <input
                type="text"
                placeholder="add a comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="comment"
                onClick={() => {
                  makeComment(comment, posts._id);
                }}
              >
                POST
              </button>
            </div>
          </div>
        );
      })}

      {
        /* show Comment */
        show && (
          <div className="showComment">
            <div className="container">
              <div className="postPic">
                <img src={item.photo} alt="" />
              </div>

              <div className="details">
                {/* card header */}
                <div
                  className="card-header"
                  style={{ borderBottom: "1px solid #00000029" }}
                >
                  <div className="card-pic">
                    <img
                      src="http://res.cloudinary.com/dpdpovte1/image/upload/v1709012645/mebivxt1i6h63aakpwsf.jpg"
                      alt=""
                    />
                  </div>
                  <h5>{item.postedBy.name}</h5>
                </div>

                {/* commentSection */}
                <div
                  className="comment-section"
                  style={{ borderBottom: "1px solid #00000029" }}
                >
                  {item.comments.map((comment) => {
                    return (
                      <p className="comm">
                        <span
                          className="commenter"
                          style={{ fontWeight: "bolder" }}
                        >
                          {comment.postedBy.name}
                        </span>
                        <span className="commentText"> {comment.comment}</span>
                      </p>
                    );
                  })}
                </div>

                {/* card content */}
                <div className="card-content">
                  <p>{item.likes.length} likes</p>
                  <p>{item.body}</p>
                </div>

                <div className="add-comment">
                  <span className="material-icons-outlined">
                    emoji_emotions
                  </span>
                  <input
                    type="text"
                    placeholder="add a comment"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <button
                    className="comment"
                    onClick={() => {
                      makeComment(comment, item._id);
                      toggleComment();
                    }}
                  >
                    POST
                  </button>
                </div>
              </div>
            </div>
            <div
              className="close-comment"
              onClick={() => {
                toggleComment();
              }}
            >
              <span className="material-icons-outlined material-icons-outlined-comment">
                close
              </span>
            </div>
          </div>
        )
      }
    </div>
  );
}
