import { useEffect, useState } from "react";

import styles from "../styles/componentsStyles/Header.module.scss";
import classNames from "classnames/bind";
import { Heart } from "../assets/svg/star";
import { AvatarIcon, BellIcon, DownloadIcon, Roof } from "../assets/icon";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const Header = () => {
  const [checkUser, setCheckUser] = useState(false);
  const [user, setUser] = useState({ id_user: "", link_avatar: "" });
  const handleDownload = ()=>{

  }
 
  useEffect(() => {
    setUser(JSON.parse(String(localStorage.getItem("user"))));
    if (localStorage.getItem("user")) setCheckUser(true);
  }, []);

  return (
    <>
      <div className={cx("header")}>
        <div className={cx("logo")}>
          <Roof />
          <Link to="/"className={cx("babyface")}>
            BABYFACE
          </Link>
        </div>
        <div className={cx("action")}>

          <div className={cx("item_action", "button")} onClick={handleDownload}>
            <DownloadIcon width="16" height="16" />
            Download app
          </div>
          <div className={cx("item_action")}>
            <BellIcon width="32" height="32" />
          </div>
          <div className={cx("item_action")}>
            <AvatarIcon width="32" height="32" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
