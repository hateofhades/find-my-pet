import React from "react";
import {
  loginPopupOverlay,
  loginPopup,
  imageDiv,
  xDiv,
} from "./LoginPopup.module.scss";
import x from "./x.svg";
import Login from "./Login";

function LoginPopup({ setLogin }) {
  const handleDissapear = () => {
    setLogin(false);
  };

  return (
    <div className={loginPopupOverlay}>
      <div className={loginPopup}>
        <div className={imageDiv}></div>
        <Login setLogin={setLogin} />
        <div className={xDiv} onClick={handleDissapear}>
          <img src={x} alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
