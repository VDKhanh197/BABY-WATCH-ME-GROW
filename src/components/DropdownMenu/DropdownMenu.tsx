import React from "react";
import classNames from "classnames/bind";
import styles from "./DropdownMenu.module.scss";
import { useNavigate } from "react-router";

const cx = classNames.bind(styles);
export default function DropdownMenu({ handleClick }: { handleClick: (index: number) => void }) {
  return (
    <div className={cx("menu")}>
      <div className={cx('list')}>
        <span onClick={() => handleClick(1)}>Profile</span>
        <span onClick={() => handleClick(2)}>Log out</span>
      </div>
    </div>
  );
}