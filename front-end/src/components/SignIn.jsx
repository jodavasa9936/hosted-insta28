import "../css/SignIn.css";
import logo from "../img/Instagram_logo.svg.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext.jsx";

export function SignIn() {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
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
      return;
    }
    //Sending  data to server
    fetch(`${import.meta.env.VITE_API}/signin`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Succesfully");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true)
          navigate("/");
        }
        console.log(data);
      });
  };

  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src={logo} alt="" />
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            id="login-btn"
            onClick={() => {
              postData();
            }}
            value="Sign In"
          />
        </div>
        <div className="loginForm2">
          Don't have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}> Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
