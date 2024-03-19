import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "../css/Modal.css";

export function Modal({ setModalOpen }) {
  const navigate = useNavigate();
  return (
    <div className="darkBg" onClick={() => setModalOpen(false)}>
      <div className="centered">
        <div className="modal">
          {/* modal Header */}
          <div className="modalHeader">
            <h5 className="heading">comfirm</h5>
          </div>
          <button className="closeBtn" onClick={() => setModalOpen(false)}>
            <RiCloseLine></RiCloseLine>
          </button>
          {/* modal content */}
          <div className="modalContent">Are you really want to log Out?</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="logOutBtn"
                onClick={() => {
                  setModalOpen(false);
                  localStorage.clear();
                  window.location.reload(navigate("./signin"))
                 
                }}
              >
                Log Out
              </button>
              <button className="cancelBtn" onClick={() => setModalOpen(false)}>
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
