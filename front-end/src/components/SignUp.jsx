import "../css/SignUp.css";
import logo from "../img/Instagram_logo.svg.png";
import { Link, useNavigate } from "react-router-dom";
import {  useState } from "react";
import { toast } from "react-toastify";

export function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //Toast function
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  /*JavaScript : HTML Form - email validation https://www.w3resource.com/javascript/form/email-validation.php */
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  /* aqui:
  (https://www.thepolyglotdeveloper.com/2020/02/test-password-strength-regex-react-application/) 
  el codigo queda asi:  */
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    } else if (!passRegex.test(password)) {
      notifyA(
        "Password must contain at least eight characters, incluiding at least on number and one includes both lower and uppercase letters and special chyaracters for example #,?,!"
      );
      return
    }
    //Sending  data to server
    fetch(`${import.meta.env.VITE_API}/signup`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/signin");
        }
        console.log(data);
      });
  };

  /*   const fetchData = async () => {
    const response = await fetch("http://localhost:1234/");
    const data = await response.json();
    console.log(data);
  };
 
  useEffect(() => {
    fetchData();
  }, []);
*/

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={logo} alt="" />
          <p className="loginPara">
            Sign up to see photos and videos <br /> from your friends
          </p>

          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Full Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              value={userName}
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Passeword"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <p
            className="loginPara"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By signing up, you are agree to out Terms, <br /> privacy policy and
            cookies policy.
          </p>
          <input
            type="submit"
            id="submit-btn"
            value="Sign Up"
            onClick={() => {
              postData();
            }}
          />
        </div>
        <div className="form2">
          Already have an account ?
          <Link to="/signin">
            <span style={{ color: "blue", cursor: "pointer" }}> Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
