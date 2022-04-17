import React from "react";
import style from "./Header.module.scss";
import defaultPic from "../../images/no-profile-pic.png";
import axios from "axios";
import logo from "../../images/logo.png";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/user";

function Header({ user, setLogin }) {
  const dispatch = useDispatch();

  const goLogout = () => {
    axios.defaults.withCredentials = true;

    dispatch(loginSuccess(null));
    window.location.reload(false);
  };

  const profilePicDiv = () => {
    if (user)
      return (
        <div className={style.profilePic}>
          <img alt="profilePic" src={user.picture || defaultPic} />
          <div className={style.dropdownPic}>
            <button onClick={goLogout}>Log out</button>
          </div>
        </div>
      );
    else
      return (
        <div className={style.profilePic}>
          <div onClick={(e) => setLogin(true)} className={style.loginDiv}>
            Log in
          </div>
        </div>
      );
  };

  return (
    <div className={style.headerDiv}>
      <img src={logo} />
      {profilePicDiv()}
    </div>
  );
}

export default Header;
