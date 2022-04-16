import React from "react";
import styles from "./Footer.module.scss";
import defaultPic from "../../images/no-profile-pic.png";
import add from "./add.svg";
import list from "./list.svg";
import map from "./map.svg";

function Footer({ user, setPage, page }) {
  return (
    <div className={styles.footerDiv}>
      <div className={styles.footerContent}>
        <div
          className={styles.footerButton}
          onClick={(e) => (page == "list" ? setPage("map") : setPage("list"))}
        >
          <img
            className={styles.footerImg}
            alt="list"
            src={page == "list" ? map : list}
          />
        </div>
        <div
          className={styles.footerButton}
          onClick={(e) => {
            page == "map" || page == "list" ? setPage("add") : setPage("map");
          }}
        >
          <img
            className={styles.footerImg}
            alt="add"
            src={
              page == "map" || page == "list" || page == "profile" ? add : map
            }
          />
        </div>
        <div className={styles.footerButton}>
          <div
            className={styles.profilePic}
            onClick={(e) => {
              setPage("profile");
            }}
          >
            <img alt="profilePic" src={user.picture || defaultPic} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
