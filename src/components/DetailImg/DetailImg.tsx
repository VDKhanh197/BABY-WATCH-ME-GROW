import React, { FC } from "react";
import classNames from "classnames/bind";
import styles from "./DetailImg.module.scss";

const cx = classNames.bind(styles);

interface MyComponentProps {
    handleClick: (isOpen: boolean) => void;
    url: string;
  }


const DetailImg:FC<MyComponentProps>= ({ handleClick ,url}) => {
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("box")}>
          <h1>Image detail</h1>
          <div className={cx("img")}>
            <img src={url} alt="" />
          </div>
          <div className={cx("btn")}>
            <span onClick={()=>{handleClick(false)}}>Close</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailImg;
