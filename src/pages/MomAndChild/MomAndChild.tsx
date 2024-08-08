import { useEffect, useState } from "react";
import styles from "./MomAndChild.module.scss";
import classNames from "classnames/bind";
import { CloudLeft, CloudRight, NextSlide, PrevSlide } from "../../assets/icon";
import { BearIcon } from "../../assets/svg/bear";
import { Pink_1, Pink_2 } from "../../assets/svg/pinkCloud";
import { Heart, Star } from "../../assets/svg/star";
import { Baby } from "../../assets/svg/baby";
// import { set } from "nprogress";

import { useNavigate, useParams } from "react-router-dom";

import { signin } from "../../services/auth";
import { swapImage, swapVideo, uploadImageSwap } from "../../services/image";
import Header from "../../components/Header";
import axios from "axios";
import images from "../../assets/images";
import DetailImg from "../../components/DetailImg/DetailImg";

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

interface ImgDetail {
  image: string;
}

const cx = classNames.bind(styles);
export default function MomAndChild() {
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [loading, setLoading] = useState(false);
  const [link1, setLink1] = useState<any>("");
  const [link2, setLink2] = useState<any>("");
  const [linkSwapVideo, setLinkSwapVideo] = useState([]);
  const [linkPrevVideo, setLinkPrevVideo] = useState<ImgDetail[]>([]);
  const [currentImg, setCurrentImg] = useState(4);
  const [pecent, setPecent] = useState(0);
  const [position, setPosition] = useState(0);
  const [isOpenDetailImg, setIsOpenDetailImg] = useState(false);
  const [urlImgDetail, setUrlImgDetail] = useState("");

  const navi = useNavigate();

  const [upLoadFace, setUpLoadFace] = useState(false);
  const [imageHistory, setImageHistory] = useState<ImageHistory[]>([]);

  const params = useParams();

  const handleOpenDetail = (isOpen: boolean) => {
    setIsOpenDetailImg(isOpen);
  };

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
      const file: File = e.target.files[0];
      const formData = new FormData();
      // const data
      if (file && e.target.files[0]) {
        formData.append("src_img", file);
        axios
          .post(
            `https://databaseswap.mangasocial.online/upload-gensk/${userId}?type=src_nu`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            pic === 1 ? setLink1(res.data) : setLink2(res.data);
          });
      }
      pic === 1
        ? setPreview1(URL.createObjectURL(e.target.files[0]))
        : setPreview2(URL.createObjectURL(e.target.files[0]));
    }
  };

  const downloadImage = (url: string) => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "linkSwapImage.jpg");

    // Append the anchor to the DOM, click it, and then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSwapFace = async () => {
    if (preview1 !== "") {
      setLoading(true);
      setLinkSwapVideo([]);
      setPecent(0);
      console.log("Click Swap");
      if (params.id !== undefined) {
        const res = await axios.get(
          `https://api.watchmegrow.online/getdata/swap/listimage_mom_baby?device_them_su_kien=browser&ip_them_su_kien=1111&id_user=${userId}&list_folder=${params.folderName}`,
          {
            headers: {
              link1: link1,
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(res.data);
        if (res) {
          setLinkSwapVideo(res.data.link_anh_swap);
        }
      }
      setLoading(false);
    } else {
      alert("input an image");
    }
  };
  //  console.log(params.id);
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

    axios
      .get(
        `https://api.watchmegrow.online/get/list_image/mom_baby_temp_detail?id=${params.id}`,
        {
          headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setLinkPrevVideo(res.data);
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
                    }}
                  >
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
              <span onClick={handleSwapFace}>Start</span>
            </div>
            <div className={cx("bottom")}>
              <div className={cx("list")}>
                {linkSwapVideo && linkSwapVideo.length > 0 ? (
                  <>
                    <div
                      className={cx("items")}
                      style={{
                        transform: `translate(${position}px)`,
                        transition: `transform linear .3s`,
                      }}
                    >
                      {linkSwapVideo &&
                        linkSwapVideo.length > 0 &&
                        linkSwapVideo.map((item, index) => {
                          return (
                            <img
                              src={item}
                              alt=""
                              key={index}
                              onClick={() => {
                                setUrlImgDetail(item);
                                setIsOpenDetailImg(true);
                              }}
                            />
                          );
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
                  <>
                    <div
                      className={cx("items")}
                      style={{
                        transform: `translate(${position}px)`,
                        transition: `transform linear .3s`,
                      }}
                    >
                      {linkPrevVideo &&
                        linkPrevVideo.length > 0 &&
                        linkPrevVideo.map((item, index) => {
                          return (
                            <img
                              src={item.image}
                              alt=""
                              key={index}
                              onClick={() => {
                                setUrlImgDetail(item.image);
                                setIsOpenDetailImg(true);
                              }}
                            />
                          );
                        })}
                    </div>
                  </>
                )}
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
                <PrevSlide />
              </div>
              <div
                className={cx("btn")}
                onClick={() => {
                  if (
                    currentImg < linkSwapVideo.length ||
                    currentImg < linkPrevVideo.length
                  ) {
                    setCurrentImg((prev) => prev + 1);
                    setPosition((prevPos) => prevPos - 166);
                  } else {
                    setCurrentImg(4);
                    setPosition(0);
                  }
                }}
              >
                <NextSlide />
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
                    console.log(item);
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
            <label htmlFor={"pic1"}>Upload new face</label>
          </div>
        </div>
      )}
      {isOpenDetailImg && (
        <DetailImg
          handleClick={(isOpen) => handleOpenDetail(isOpen)}
          url={urlImgDetail}
        />
      )}
    </>
  );
}
