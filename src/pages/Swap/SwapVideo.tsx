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
import images from "../../assets/images";
import axios from "axios";

interface ImageHistory {
  url: string;
}

type User = {
  id_user: number;
  link_avatar: string;
  count_comment: number;
  count_sukien: number;
  count_view: number;
  device_register: string;
  email: string;
  ip_register: string;
  token: string;
  user_name: string;
};

const cx = classNames.bind(styles);
function SwapVideo() {
  const [loading, setLoading] = useState(false);
  const [picOne, setPicOne] = useState("");
  const [imageHistory, setImageHistory] = useState<ImageHistory[]>([]);
  const [upLoadFace, setUpLoadFace] = useState(false);

  const [link1, setLink1] = useState<any>("");

  const [linkSwapVideo, setLinkSwapVideo] = useState("");
  const [pecent, setPecent] = useState(0);

  const navi = useNavigate();
  const params = useParams();

  try {
    let user: User | null = null;
    const userString = localStorage.getItem("user");
    if (userString) {
      user = JSON.parse(userString) as User;
      localStorage.setItem("userId", user.id_user.toString());
    }

    // Process the parsed data
  } catch (error) {
    console.error("Error parsing JSON:", error);
    // Handle the error, e.g., display an error message to the user
  }

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("accessToken");

  const handleDownload = () => {};

  const handleChooseImg = async (src: string) => {
    setPicOne(src);
    setUpLoadFace(false);
    const str = `/var/www/build_futurelove/${src.replace(
      "https://futurelove.online/",
      ""
    )}`;
    setLink1(str);
  };

  const handleSelectFile = () => {
    console.log("Here");
  };
  const handleInputImg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    pic: number
  ) => {
    setUpLoadFace(false);
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      if (pic === 1) {
        const formData = new FormData();
        formData.append("src_img", e.target.files[0]);
        let res1 = await uploadImageSwap(formData, "nu");
        setLink1(res1);
        const imgURL = URL.createObjectURL(e.target.files[0]).toString();
        setPicOne(imgURL);
      }
    }
  };
  const handleSwapFace = async () => {
    if (picOne !== "") {
      setLoading(true);
      setLinkSwapVideo("");
      setPecent(0);
      //   console.log("Click Swap");
      if (params.id !== undefined) {
        const res = await swapVideoVersion2(link1, +params.id);
        console.log(res);
        if (res) {
          setLinkSwapVideo(res.sukien_video.link_vid_da_swap);
        }
      }
      setLoading(false);
    } else {
      alert("input an image");
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://databaseswap.mangasocial.online/images/${userId}?type=video`,
        {
          headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.image_links_video);
        setImageHistory(res.data.image_links_video);
      });

    const interval = setInterval(() => {
      setPecent((prev) => prev + 1);
    }, 1800);

    return () => clearInterval(interval);
  }, []);
console.log(link1);
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
                {picOne != "" ? (
                  <img className={cx("preview")} src={picOne} />
                ) : (
                  <label htmlFor="upload-face">
                    <img src={images.uploadImage} alt="" />
                  </label>
                )}

                <input
                  type="file"
                  id="upload-face"
                  onChange={(e) => handleInputImg(e, 1)}
                  hidden={true}
                />
              </div>

              <div className={cx("action")}>
                <span onClick={() => setUpLoadFace(true)}>
                  Upload your face
                </span>

                <span onClick={handleSwapFace}>Start</span>
              </div>

              {/*<div className={cx("history")}>*/}
              {/*  <img src={picUploaded} alt=""/>*/}
              {/*</div>*/}
            </div>
            <div className={cx("box_result")}>
              <div className={cx("result")}>
                {linkSwapVideo ? (
                  <video controls src={linkSwapVideo} />
                ) : loading ? (
                  <div className={cx("preloader")}>
                    <div className={cx("loading")}>
                      <span>{pecent}%</span>
                      <div className={cx("pecent")}></div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
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
      {upLoadFace && (
        <div className={cx("preUpload")}>
          <div className={cx("box-upload")}>
            <h1>Choose your face</h1>
            <div className={cx("his-upload")}>
              <div className={cx("list")}>
                {imageHistory &&
                  imageHistory.length > 0 &&
                  imageHistory.map((item, index) => {
                    return (
                      <img
                        src={item.toString()}
                        alt=""
                        key={index}
                        onClick={() => handleChooseImg(item.toString())}
                      />
                    );
                  })}
              </div>
            </div>
            <span onClick={() => setUpLoadFace(false)}>Close</span>
            <label htmlFor="upload-face">Upload new face</label>
          </div>
        </div>
      )}
    </>
  );
}

export default SwapVideo;
