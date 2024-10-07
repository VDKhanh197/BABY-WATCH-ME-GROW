import { useEffect, useState } from "react";

import styles from "../styles/componentsStyles/Header.module.scss";
import classNames from "classnames/bind";
import { Heart } from "../assets/svg/star";
import { AvatarIcon, BellIcon, DownloadIcon, Roof } from "../assets/icon";
import { Link, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
const cx = classNames.bind(styles);

const {width} = window.screen;

const Header = () => {
  const [checkUser, setCheckUser] = useState(false);
  const [user, setUser] = useState({ id_user: "", link_avatar: "" });
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();
  const handleDownload = () => {};

  const handleLogin = () => {
    if (checkUser) {
      setIsOpenMenu(!isOpenMenu);
    } else {
      navigate("/login");
    }
  };

  const handleMenu = (index:number) => {
    if (index === 1) {
      navigate(`/profile/${user.id_user}`);
    } else {
      localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    setUser(JSON.parse(String(localStorage.getItem("user"))));
    if (localStorage.getItem("user")) setCheckUser(true);
    console.log(width)
  }, []);

  return (
    <>
      <div className={cx("header")}>
        <div className={cx("logo")}>
          <Roof width={width.toString()}/>
          <Link to="/" className={cx("babyface")}>
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
          <div className={cx("item_action")} onClick={handleLogin}>
            <AvatarIcon width="32" height="32" />
          </div>
        </div>

        {isOpenMenu && (
          <DropdownMenu
            handleClick={(index) => {
              handleMenu(index);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Header;
