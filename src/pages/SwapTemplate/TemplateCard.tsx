import styles from "./SwapTemplate.module.scss";
import classNames from "classnames/bind";
import React, { FC, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { SoundIcon } from "../../assets/icon";

interface TemplateCardProps {
  data: {
    linkgoc: string | "";
    id: number;
    image_sample: string | "";
    folder_name: string | "";
    id_cate: string | "";
  };
  type: string;
  index: number;
}
const cx = classNames.bind(styles);

const TemplateCard: FC<TemplateCardProps> = ({ data, type, index }) => {
  const [isSound, setIsSound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const video1 = useRef<HTMLVideoElement>(null);
  const handlePlayVideo = async (e: any) => {
    if (
      e.target.paused === true &&
      // isPlay === true &&
      e.target.readyState === 4
    ) {
      e.target.play();
    }
  };
  const handlePauseVideo = (e: any) => {
    // console.log(e.target.paused);
    if (e.target.paused === false && e.target.readyState === 4) {
      e.target.pause();
      // e.target.muted = false;
    }
  };
  const handleCanPlay = (e: any) => {
    setIsLoading(true);
    if (video1.current !== null) {
      video1.current.muted = false;
      // setIsSound(!isSound);
    }
  };
  const handleSound = () => {
    if (video1.current !== null) {
      video1.current.muted = isSound;
      setIsSound(!isSound);
    }
  };

  if (data.linkgoc === "") {
    return <></>;
  }
  if (type === "k&m") {
    return (
      <div className={cx("card")}>
        <div className={cx("box")}>
          <img src={data.image_sample} alt="" />

          {/* {isLoading && (
            <div onClick={handleSound} className={cx("sound")}>
              {isSound && <SoundIcon />}
            </div>
          )} */}
        </div>
        <Link
          className={cx("button")}
          to={`/momandchild/${data.folder_name}/${data.id_cate}`}
        >
          Choose
        </Link>
      </div>
    );
  } else {
    return (
      <div className={cx("card")}>
        <div className={cx("box")}>
          <video
            ref={video1}
            src={data.linkgoc}
            onMouseOver={(event) => handlePlayVideo(event)}
            onMouseLeave={(event) => handlePauseVideo(event)}
            muted={true}
            // controls
            // controlsList="nodownload and nofullscreen and noremoteplayback"
            // onCanPlay={handleCanPlay}
          />

          {/* {isLoading && (
            <div onClick={handleSound} className={cx("sound")}>
              {isSound && <SoundIcon />}
            </div>
          )} */}
        </div>
        <Link
          className={cx("button")}
          to={
            type === "d&m" ? `/momanddad/${data.id}` : `/swapVideo/${data.id}`
          }
        >
          Choose
        </Link>
      </div>
    );
  }
};

export default TemplateCard;
