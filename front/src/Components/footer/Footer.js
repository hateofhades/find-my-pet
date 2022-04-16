import React from "react";
import styles from "./Footer.module.scss";
import defaultPic from "../../images/no-profile-pic.png";
import add from "./add.svg";
import list from "./list.svg";

function Footer({ user }) {
  return (
    <div className={styles.footerDiv}>
      <div className={styles.footerContent}>
        <div className={styles.footerButton}>
          <img className={styles.footerImg} alt="list" src={list} />
        </div>
        <div className={styles.footerButton}>
          <img className={styles.footerImg} alt="add" src={add} />
        </div>
        <div className={styles.footerButton}>
          <div className={styles.profilePic}>
            <img alt="profilePic" src={user.picture || defaultPic} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
