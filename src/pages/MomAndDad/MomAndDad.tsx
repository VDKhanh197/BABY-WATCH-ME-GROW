import { useEffect, useState } from "react";
import styles from "./MomAndDad.module.scss";
import classNames from "classnames/bind";
import {
  CloudLeft,
  CloudRight,
  NextSlide,
  PlayIcon,
  PrevSlide,
} from "../../assets/icon";
import { BearIcon } from "../../assets/svg/bear";
import { Pink_1, Pink_2 } from "../../assets/svg/pinkCloud";
import { Heart, Star } from "../../assets/svg/star";
import { Baby } from "../../assets/svg/baby";
// import { set } from "nprogress";

import { useNavigate, useParams } from "react-router-dom";

import { signin } from "../../services/auth";
import {
  swapImage,
  swapVideo,
  swapVideoMomAndDad,
  swapVideoVersion2,
  uploadImageSwap,
} from "../../services/image";
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

interface ImageHistory {
  url: string;
}

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
  const [timeCoin, setTimeCoin] = useState(0);


  const navi = useNavigate();

  const [upLoadFace, setUpLoadFace] = useState(false);
  const [isLeftIn, setIsLeftIn] = useState(true);
  const [imageHistory, setImageHistory] = useState<ImageHistory[]>([]);

  const handleChooseImg = async (src: string, isLeftIn: boolean) => {
    setUpLoadFace(false);
    const str = `/var/www/build_futurelove/${src.replace(
      "https://photo.gachmen.org/",
      ""
    )}`;
    if (isLeftIn) {
      setLink1(str);
      setPreview1(src);
    } else {
      setLink2(str);
      setPreview2(src);
    }
  };

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
  const params = useParams();

  const handleInputImg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    pic: number
  ) => {
    setUpLoadFace(false);
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      const file: File = e.target.files[0];
      const formData = new FormData();
      // const data
      if (file && e.target.files[0]) {
        formData.append("src_img", file);
        axios
          .post(
            `https://api.funface.online/upload-gensk/${userId}?type=src_nu`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            if (res.data.message) {
              alert(res.data.message);
              return;
            }
            pic === 1 ? setLink1(res.data) : setLink2(res.data);
          });
        if (link1 || link2) {
          pic === 1
            ? setPreview1(URL.createObjectURL(e.target.files[0]))
            : setPreview2(URL.createObjectURL(e.target.files[0]));
        }
      }
    }
  };

  const handleSwapFace = async () => {
    getTimeCoin();
    if (timeCoin <= 0) {
      alert("please get more coin to swap face! you have: " + timeCoin + ", You can get more coin from application in app store or google play store");
      return;
    }
    console.log("Click Swap");
    setPecent(0);
    setLoading(true);
    if (params.id !== undefined) {
      handleUpdateCoin(userId);

      const randomLink = Math.random() < 0.5 ? link1 : link2;
      const res = await swapVideoMomAndDad(userId, randomLink, +params.id);
      console.log(res);
      if (res) {
        setLinkSwapVideo(res.sukien_video.link_vid_da_swap);
      }
    }
    setLoading(false);
  };
  const getTimeCoin = async () => {
    try {
      const response = await axios.get(
        `https://api.funface.online/get_coin_inapp/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeCoin(response.data.coin_number);
      console.log(response.data.coin_number);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCoin = async (userId: any) => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("coin_number", (timeCoin - 1).toString());
    try {
      const response = await axios.post(
        `https://api.funface.online/buy_coin_inapp`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );
      console.log(response.data);
      setTimeCoin((prev) => prev - 1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://api.funface.online/images/${userId}?type=video`,
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
      setPecent((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    getTimeCoin();
  }, [timeCoin]);
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
                  <label
                    onClick={() => {
                      setUpLoadFace(true);
                      setIsLeftIn(true);
                    }}
                  >
                    <img src={images.uploadImage} alt="" />
                  </label>
                ) : (
                  <img src={preview1} />
                )}
              </div>
              <div className={cx("box")}>
                {preview2 == "" ? (
                  <label
                    onClick={() => {
                      setUpLoadFace(true);
                      setIsLeftIn(false);
                    }}
                  >
                    <img src={images.uploadImage} alt="" />
                  </label>
                ) : (
                  <img src={preview2} />
                )}
              </div>
              <input
                type="file"
                id="pic1"
                hidden={true}
                onChange={(e) => handleInputImg(e, 1)}
              />
              <input
                type="file"
                id="pic2"
                hidden={true}
                onChange={(e) => handleInputImg(e, 2)}
              />
            </div>
            <div className={cx("btn")}>
              <span onClick={handleSwapFace}>Start</span>
            </div>
            <div className={cx("bottom")}>
              <div className={cx("result")}>
                {linkSwapVideo && linkSwapVideo.length > 0 ? (
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
      {upLoadFace && (
        <div className={cx("preUpload")}>
          <div className={cx("box-upload")}>
            <h1>Choose your face</h1>
            <div className={cx("his-upload")}>
              <div className={cx("list")}>
                {imageHistory &&
                  imageHistory.length > 0 &&
                  imageHistory.map((item, index) => {
                    const string = item.toString();
                    const src = string.replace(
                      "futurelove.online",
                      "photo.gachmen.org"
                    );
                    return (
                      <img
                        src={src}
                        alt=""
                        key={index}
                        onClick={() => handleChooseImg(src, isLeftIn)}
                      />
                    );
                  })}
              </div>
            </div>
            <span onClick={() => setUpLoadFace(false)}>Close</span>
            <label htmlFor={isLeftIn ? "pic1" : "pic2"}>Upload new face</label>
          </div>
        </div>
      )}
    </>
  );
}
