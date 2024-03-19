import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import "../css/CreatePost.css";

export function CreatePost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate()

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);


  useEffect (() => {
    //saving post to mongodb
    fetch(`${import.meta.env.VITE_API}/createPost`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        body,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {if(data.error){
        notifyA("Please add all the fields")
      }else{
        notifyB("Succesfully posted")
        console.log(data)
        navigate("/")
      }})
      .catch((err) => console.log(err));
  },[url])
  /* https://console.cloudinary.com/settings/c-166db98f9132ca287b0b0b32e4bfd2/upload */
  /* https://www.youtube.com/watch?v=43Ig6bQKX6Q */
  /* video10 */

  /* Posting image to cloudinary */
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "cantacloud2");
    fetch("https://api.cloudinary.com/v1_1/dpdpovte1/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div className="createPost">
      {/* Header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button
          onClick={() => {
            postDetails();
          }}
          id="post-btn"
          style={{ margin: "3px auto" }}
        >
          Share
        </button>
      </div>
      {/* image preview */}
      <div className="main-div">
        <img
          id="output"
          src="https://media.istockphoto.com/id/931643150/es/vector/icono-de-imagen.jpg?s=170667a&w=0&k=20&c=tnXVJY84-7PMiZcyo7xxL7W3gudaMCQka02yZrKV3Bc="
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww"
              alt=""
            />
          </div>
          <h5>Ramesh</h5>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="write a caption..."
        ></textarea>
      </div>
    </div>
  );
}
