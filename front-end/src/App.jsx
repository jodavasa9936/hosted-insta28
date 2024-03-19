import "./App.css";
import { Home } from "./screens/Home";
import { NavBar } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Profile } from "./screens/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreatePost } from "./screens/CreatePost.jsx";
import { useContext } from "react";
import { LoginContext } from "./context/LoginContext.jsx";
import { Modal } from "./components/Modal.jsx";
import { UserProfile } from "./components/UserProfile.jsx";
import { MyFollowingPost } from "./screens/MyFollowingPost.jsx";

function App() {
  const { userLogin, modalOpen, setModalOpen } = useContext(LoginContext);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar login={userLogin} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
          <Route path="/profile/:userid" element={<UserProfile />}></Route>
          <Route path="/followingpost" element={<MyFollowingPost />}></Route>
        </Routes>
        <ToastContainer theme="dark" />
        {modalOpen && <Modal setModalOpen={setModalOpen} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
