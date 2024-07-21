import { useEffect, useState } from "react";
import styles from "./SwapVideo.module.scss";
import classNames from "classnames/bind";
import { CloudLeft, CloudRight } from "../../assets/icon";
import { BearIcon } from "../../assets/svg/bear";
import { Pink_1, Pink_2 } from "../../assets/svg/pinkCloud";
import { Heart, Star } from "../../assets/svg/star";
import { Baby } from "../../assets/svg/baby";
// import { set } from "nprogress";

import { useNavigate, useParams } from "react-router-dom";

import { signin } from "../../services/auth";
import { SwapBox_1, SwapBox_2 } from "../../assets/svg/swapbox";
import {
  swapImage,
  swapVideo,
  swapVideoVersion2,
  uploadImageSwap,
} from "../../services/image";
import Header from "../../components/Header";

const cx = classNames.bind(styles);
function SwapVideo() {
  const [loading, setLoading] = useState(true);
  const [picOne, setPicOne] = useState("");

  const [link1, setLink1] = useState<any>("");

  const [linkSwapVideo, setLinkSwapVideo] = useState("");
  const navi = useNavigate();
  const params = useParams();

  const handleDownload = () => {};
  const handleSelectFile = () => {
    console.log("Here");
  };
  const handleInputImg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    pic: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      if (pic === 1) {
        const formData = new FormData();
        formData.append("src_img", e.target.files[0]);
        let res1 = await uploadImageSwap(formData, 241, "nu");
        setLink1(res1);
        setPicOne(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const handleSwapFace = async () => {
    //   console.log("Click Swap");
    if (params.id !== undefined) {
      const res = await swapVideoVersion2(link1, +params.id);
      console.log(res);
      if (res) {
        setLinkSwapVideo(res.sukien_video.link_vid_da_swap);
      }
    }
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("image_head")}>
          <Heart />
        </div>
        <Header />
        <div className={cx("image_middle")}>
          <Star />
        </div>
        <div className={cx("body")}>
          <div className={cx("body_wrapper")}>
            <div
              className={cx("swap_box", "swap_1")}
              onClick={handleSelectFile}
            >
              {/* <SwapBox_1 /> */}

              <div className={cx("button_swap")}>
                {picOne != "" && <img className={cx("preview")} src={picOne} />}

                <input type="file" onChange={(e) => handleInputImg(e, 1)} />
              </div>
            </div>

            <div className={cx("action")} onClick={handleSwapFace}>
              <span>Start</span>
            </div>
            {linkSwapVideo !== "" && (
              <div className={cx("result")}>
                <video controls src={linkSwapVideo} />
              </div>
            )}
          </div>
        </div>
        <div className={cx("image_bottom")}>
          <CloudLeft />
          <CloudRight />
          <Pink_1 />
          <BearIcon />
          <Baby />
          <Pink_2 />
        </div>
      </div>
    </>
  );
}

export default SwapVideo;
