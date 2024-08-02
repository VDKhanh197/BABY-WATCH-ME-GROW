import { useEffect, useState } from "react";
import styles from "./MomAndChild.module.scss";
import classNames from "classnames/bind";
import { CloudLeft, CloudRight, NextSlide, PrevSlide } from "../../assets/icon";
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

interface ImageHistory {
  url: string;
}

const cx = classNames.bind(styles);
export default function MomAndChild() {
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [loading, setLoading] = useState(false);
  const [link1, setLink1] = useState<any>("");
  const [link2, setLink2] = useState<any>("");
  const [linkSwapVideo, setLinkSwapVideo] = useState([
    images.imgAt1,
    images.imgAt2,
    images.imgAt3,
    images.imgAt4,
    images.imgAt5,
    images.imgAt6,
  ]);
  const [currentImg, setCurrentImg] = useState(4);
  const [pecent, setPecent] = useState(0);
  const [position, setPosition] = useState(0);

  const navi = useNavigate();

  const [upLoadFace, setUpLoadFace] = useState(false);
  const [imageHistory, setImageHistory] = useState<ImageHistory[]>([]);

  const handleChooseImg = async (src: string) => {
    setUpLoadFace(false);
    const str = `/var/www/build_futurelove/${src.replace(
      "https://futurelove.online/",
      ""
    )}`;
    setPreview1(src);
    setLink1(str);
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

  const downloadImage = (url:string) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', "linkSwapImage.jpg");

    // Append the anchor to the DOM, click it, and then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                  <label onClick={() => {
                      setUpLoadFace(true);
                    }}>
                    <img src={images.uploadImage} alt="" />
                  </label>
                ) : (
                  <img src={preview1} />
                )}
              </div>
              {/* <div className={cx("box")}>
                {preview2 == "" ? (
                  <label htmlFor="upload2">
                    <img src={images.uploadImage} alt="" />
                  </label>
                ) : (
                  <img src={preview2} />
                )}
              </div> */}
              <input
                type="file"
                id="pic1"
                hidden={true}
                onChange={(e) => handleInputImg(e, 1)}
              />
              {/* <input
                type="file"
                id="upload2"
                hidden={true}
                onChange={(e) => handleInputImg(e, 2)}
              /> */}
            </div>
            <div className={cx("btn")}>
              <span>Start</span>
            </div>
            <div className={cx("bottom")}>
              <div className={cx("list")}>
                {linkSwapVideo ? (
                  <>
                    <div
                      className={cx("items")}
                      style={{
                        transform: `translate(${position}px)`,
                        transition: `transform linear .3s`,
                      }}
                    >
                      {linkSwapVideo &&
                        linkSwapVideo.map((item, index) => {
                          return <img src={item} alt="" key={index} />;
                        })}
                    </div>
                  </>
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
              {linkSwapVideo && (
                <div className={cx("action-slide")}>
                  <div
                    className={cx("btn")}
                    onClick={() => {
                      if (currentImg < linkSwapVideo.length) {
                        setCurrentImg((prev) => prev + 1);
                        setPosition((prevPos) => prevPos - 166);
                      } else {
                        setCurrentImg(4);
                        setPosition(0);
                      }
                    }}
                  >
                    <PrevSlide />
                  </div>
                  <div
                    className={cx("btn")}
                    onClick={() => {
                      if (currentImg > 4) {
                        setCurrentImg((prev) => prev - 1);
                        setPosition((prevPos) => prevPos + 166);
                      }
                    }}
                  >
                    <NextSlide />
                  </div>
                </div>
              )}
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
                    console.log(item);
                    return (
                      <img
                        src={item.toString()}
                        alt=""
                        key={index}
                        onClick={() =>
                          handleChooseImg(item.toString())
                        }
                      />
                    );
                  })}
              </div>
            </div>
            <span onClick={() => setUpLoadFace(false)}>Close</span>
            <label htmlFor={'pic1'}>Upload new face</label>
          </div>
        </div>
      )}
    </>
  );
}
