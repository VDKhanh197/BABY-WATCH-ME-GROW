import React, { FC, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DetailImg.module.scss";

const cx = classNames.bind(styles);

interface MyComponentProps {
  handleClick: (isOpen: boolean) => void;
  url: any[];
}


const DetailImg: FC<MyComponentProps> = ({ handleClick, url }) => {
  const [position,setPosition]= useState(0);
  const handleNext = () => {
    if (position < url.length - 1) {
      setPosition(position + 1)
    } else {
      setPosition(0);
    }
  }
  const handlePrevious = () => {
    if (position > 0) {
      setPosition(position - 1)
    } else {
      setPosition(url.length - 1);
    }
  }
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("box")}>
          <h1>Image detail</h1>
          <div className={cx("list-img")}>
            <div className={cx("img")} style={{ transform:`translateX(-${position * 972}px)`}}>
              {
                url && url.map((item, index) => {
                  if (item!== undefined) {
                    const string = item.link_da_swap || item;
                    const url = string.replace("futurelove.online", "photo.gachmen.org");
                    return <div className={cx("item")} key={index}>
                      <img src={url} alt="" />
                    </div>
                  }
                  return <></>
                })
              }
            </div>
            <div className={cx("btn")} onClick={handleNext}>
              <span>{"<"}</span>
              <span>{">"}</span>
            </div>
          </div>
          <div className={cx("btn")}>
            <span onClick={() => { handleClick(false) }}>Close</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailImg;
