import React, { useState } from "react";
import style from "./ProfilePage.module.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/user";

function ProfilePage({ user }) {
  const [phoneValue, setPhone] = useState(user.phoneValue);
  const dispatch = useDispatch();

  return (
    <div className={style.profilePage}>
      <div className={style.profileSpacer}></div>
      <div className={style.profileContent}>
        <img src={user.picture} alt="" className={style.profileImage} />
        <div className={style.profileName}>
          <p>{user.user}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <div className={style.phoneNumber}>
        <PhoneInput
          country={"ro"}
          value={phoneValue}
          onChange={(phone) => {
            setPhone(phone);
            dispatch(loginSuccess({ ...user, phoneValue }));
          }}
        />
      </div>
      <div className={style.profileButton}>My announcements</div>
      <div className={style.profileButton}>My announcements</div>
      <div className={style.profileButton}>My announcements</div>
    </div>
  );
}

export default ProfilePage;
