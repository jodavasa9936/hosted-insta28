import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../css/PostDetail.css";

export function PostDetail({ item, toggleDetails }) {
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const removePost = (postId) => {
    if (window.confirm("Do you realle want to delete this post? ")) {
      fetch(`${import.meta.env.VITE_API}/deletePost/${postId}`, {
        method: "delete",
        headers: {
          "x-access-token": localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          window.location.reload("./profile");
          notifyB(result.message);
        });
    }
  };

  return (
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
            <div className="deletePost">
              <span
                className="material-icons-outlined"
                onClick={() => {
                  removePost(item._id);
                }}
              >
                delete
              </span>
            </div>
          </div>

          {/* commentSection */}
          <div
            className="comment-section"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            {item.comments.map((comment) => {
              return (
                <p className="comm" key={item._id}>
                  <span className="commenter" style={{ fontWeight: "bolder" }}>
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
            <span className="material-icons-outlined">emoji_emotions</span>
            <input
            /*               type="text"
              placeholder="add a comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }} */
            />
            <button
              className="comment"
              /*               onClick={() => {
                makeComment(comment, item._id);
                toggleComment();
              }} */
            >
              POST
            </button>
          </div>
        </div>
      </div>
      <div
        className="close-comment"
        onClick={() => {
          toggleDetails();
        }}
      >
        <span className="material-icons-outlined material-icons-outlined-comment">
          close
        </span>
      </div>
    </div>
  );
}
