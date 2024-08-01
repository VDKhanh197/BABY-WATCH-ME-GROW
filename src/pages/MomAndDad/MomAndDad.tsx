import { useEffect, useState } from "react";
import styles from "./MomAndDad.module.scss";
import classNames from "classnames/bind";
import { CloudLeft, CloudRight, NextSlide, PlayIcon, PrevSlide } from "../../assets/icon";
import { BearIcon } from "../../assets/svg/bear";
import { Pink_1, Pink_2 } from "../../assets/svg/pinkCloud";
import { Heart, Star } from "../../assets/svg/star";
import { Baby } from "../../assets/svg/baby";
// import { set } from "nprogress";

import { useNavigate } from "react-router-dom";

import { signin } from "../../services/auth";
import { swapImage, swapVideo, uploadImageSwap } from "../../services/image";
import Header from "../../components/Header";
import axios from "axios";
import images from "../../assets/images";

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

export default function MomAndDad() {
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [loading, setLoading] = useState(false);
  const [link1, setLink1] = useState<any>("");
  const [link2, setLink2] = useState<any>("");
  const [linkSwapVideo, setLinkSwapVideo] = useState("");
  const [currentImg, setCurrentImg] = useState(4);
  const [pecent, setPecent] = useState(0);
  const [position, setPosition] = useState(0);

  const navi = useNavigate();

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
        let res1 = await uploadImageSwap(formData, "nu");
        setLink1(res1);
        const imgURL = URL.createObjectURL(e.target.files[0]).toString();
        setPreview1(imgURL);
        console.log(res1);
      }
      if (pic === 2) {
        const formData = new FormData();
        formData.append("src_img", e.target.files[0]);
        let res1 = await uploadImageSwap(formData, "nu");
        setLink2(res1);
        const imgURL = URL.createObjectURL(e.target.files[0]).toString();
        setPreview2(imgURL);
        console.log(res1);
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setPecent((prev) => prev + 1);
    }, 1800);

    return () => clearInterval(interval);
  }, []);
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
            <div className={cx("top")}>
              <div className={cx("box")}>
                {preview1 == "" ? (
                  <label htmlFor="upload1">
                    <img src={images.uploadImage} alt="" />
                  </label>
                ) : (
                  <img src={preview1} />
                )}
              </div>
              <div className={cx("box")}>
                {preview2 == "" ? (
                  <label htmlFor="upload2">
                    <img src={images.uploadImage} alt="" />
                  </label>
                ) : (
                  <img src={preview2} />
                )}
              </div>
              <input
                type="file"
                id="upload1"
                hidden={true}
                onChange={(e) => handleInputImg(e, 1)}
              />
              <input
                type="file"
                id="upload2"
                hidden={true}
                onChange={(e) => handleInputImg(e, 2)}
              />
            </div>
            <div className={cx("btn")}>
              <span>Start</span>
            </div>
            <div className={cx("bottom")}>
              <div className={cx("result")}>
                {linkSwapVideo ? (
                  <video src={linkSwapVideo} controls />
                ) : loading ? (
                  <div className={cx("preloader")}>
                    <div className={cx("loading")}>
                      <span>{pecent}%</span>
                      <div className={cx("pecent")}></div>
                    </div>
                  </div>
                ) : (
                  <div className={cx("result-wrapper")}>
                    <PlayIcon />
                  </div>
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
    </>
  );
}
