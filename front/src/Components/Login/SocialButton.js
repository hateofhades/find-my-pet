import React from "react";
import style from "./SocialButton.module.scss";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/user";
import axios from "axios";

function SocialButton({ logo, text, action, setLogin }) {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    let user = await action();

    if (user != null) {
      dispatch(
        loginSuccess({
          user: user.displayName,
          email: user.email,
          picture: user.photoURL,
        })
      );

      setLogin(false);

      await axios.post("http://localhost:5050/login", {
        user: user.displayName,
        email: user.email,
        picture: user.photoURL,
      });
    }
  };

  return (
    <div className={`${style.socialBtn}`} onClick={handleLogin}>
      <img className={style.logo} src={logo} alt="" />
      {text}
    </div>
  );
}

export default SocialButton;
