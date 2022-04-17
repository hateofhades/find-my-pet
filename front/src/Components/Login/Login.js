import React from "react";
import SocialButton from "./SocialButton";
import gLogo from "./g-logo.svg";
import style from "./Login.module.scss";
import { useTranslation } from "react-i18next";

import { signInWithGoogle } from "../../firebase/utils.js";

function Login({ setLogin }) {
  const { t } = useTranslation();

  return (
    <div className={style.loginDiv}>
      <div className={`${style.otherDivs}`}>
        <SocialButton
          text={t("authPopup.login.signGoogle")}
          logo={gLogo}
          action={signInWithGoogle}
          setLogin={setLogin}
        />
      </div>
    </div>
  );
}

export default Login;
