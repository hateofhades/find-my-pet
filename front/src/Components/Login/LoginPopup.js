import React from "react";
import style from "./LoginPopup.module.scss";
import x from "./x.svg";
import Login from "./Login";

function LoginPopup({ setLogin }) {
  const handleDissapear = () => {
    setLogin(false);
  };

  return (
    <div className={style.loginPopupOverlay}>
      <div className={style.loginPopup}>
        <div className={style.imageDiv}></div>
        <Login setLogin={setLogin} />
        <div className={style.xDiv} onClick={handleDissapear}>
          <img src={x} alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
