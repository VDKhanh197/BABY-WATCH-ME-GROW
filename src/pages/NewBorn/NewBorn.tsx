import { useEffect, useState } from "react";
import styles from "./NewBorn.module.scss";
import classNames from "classnames/bind";
import { CloudLeft, CloudRight } from "../../assets/icon";
import { BearIcon } from "../../assets/svg/bear";
import { Pink_1, Pink_2 } from "../../assets/svg/pinkCloud";
import { Heart, Star } from "../../assets/svg/star";
import { Baby } from "../../assets/svg/baby";
// import { set } from "nprogress";

import { useNavigate } from "react-router-dom";

import { signin } from "../../services/auth";
import { SwapBox_1, SwapBox_2 } from "../../assets/svg/swapbox";
import { swapImage, swapVideo, uploadImageSwap } from "../../services/image";
import Header from "../../components/Header";
import { InputNewBorn, MomAndDad } from "../../assets/svg/momanddad";
import axios from "axios";
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

const cx = classNames.bind(styles);
function NewBorn() {
  const [switchToggle, setSwitchToggle] = useState(true);
  const [picOne, setPicOne] = useState("");
  const [picTwo, setPicTwo] = useState("");
  const [link1, setLink1] = useState<any>("");
  const [link2, setLink2] = useState<any>("");
  const [linkSwapImage, setLinkSwapImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pecent, setPecent] = useState(0);

  const [upLoadFace, setUpLoadFace] = useState(false);
  const [isLeftIn, setIsLeftIn] = useState(true);
  const [imageHistory, setImageHistory] = useState<ImageHistory[]>([]);
  const [isOpenDetailImg, setIsOpenDetailImg] = useState(false);
  const [urlImgDetail, setUrlImgDetail] = useState("");

  const navi = useNavigate();

  const handleOpenDetail = (isOpen: boolean) => {
    setIsOpenDetailImg(isOpen);
  };

  const handleChooseImg = async (src: string, isLeftIn: boolean) => {
    setUpLoadFace(false);
    const str = `/var/www/build_futurelove/${src.replace(
      "https://photo.gachmen.org/",
      ""
    )}`;
    if (isLeftIn) {
      setLink1(str);
      setPicOne(src);
    } else {
      setLink2(str);
      setPicTwo(src);
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

  const handleSwitchPage = (value: boolean) => {
    setSwitchToggle(value);
    setPicTwo("");
    setLink2("");
  };
  const handleDownload = () => {};
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
            ? setPicOne(URL.createObjectURL(e.target.files[0]))
            : setPicTwo(URL.createObjectURL(e.target.files[0]));
        }
      }
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

  const handleSwapFace = async () => {
    console.log("Click Swap");
    if (link1 && link2) {
      setPecent(0);
      const browser = window.navigator.userAgent;
      const ip = "unknown";
      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `https://video.funface.online/getdata/swap/listimage_baby_newborn`,
          {
            params: {
              device_them_su_kien: browser,
              ip_them_su_kien: ip,
              id_user: userId,
              list_folder: "Newborn1",
            },

            headers: {
              link1: link1,
              link2: link2,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        // const listImgs = JSON.parse(data[0].body);
        // console.log(listImgs);
        setLinkSwapImage(data.link_anh_swap);
        // setIsLoading(false);
      } catch (error) {
        // alert("login to continue...");
        // navi('/login');
        console.log(error);
      }
    } else {
      alert("Uploade images to continue...");
    }
  };
  // console.log(link1);
  // console.log(link2);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("image_head")}>
          <Heart />
        </div>
        <Header />
        <div className={cx("image_middle")}>
          {/* <MomAndDad /> */}
          <Star />
        </div>
        <div className={cx("body")}>
          <div className={cx("body_wrapper")}>
            <InputNewBorn />
            <div className={cx("input_box")}>
              <div className="pic">
                {picOne != "" ? (
                  <img src={picOne} />
                ) : (
                  <label
                    className={cx("in-pic")}
                    onClick={() => {
                      setUpLoadFace(true);
                      setIsLeftIn(true);
                    }}
                  ></label>
                )}
                <input
                  type="file"
                  id={"pic1"}
                  onChange={(e) => handleInputImg(e, 1)}
                  hidden={true}
                />
              </div>
              <div className="pic">
                {picTwo != "" ? (
                  <img src={picTwo} />
                ) : (
                  <label
                    className={cx("in-pic")}
                    onClick={() => {
                      setUpLoadFace(true);
                      setIsLeftIn(false);
                    }}
                  ></label>
                )}
                <input
                  type="file"
                  id={"pic2"}
                  onChange={(e) => handleInputImg(e, 2)}
                  hidden={true}
                />
              </div>
            </div>
            <div className={cx("action")}>
              {isLoading ? (
                linkSwapImage && linkSwapImage.length > 0 ? (
                  <div className={cx("result")}>
                    <div className={cx("img-swap")}>
                      {linkSwapImage.map((item, index) => {
                        return (
                          <img
                            src={item}
                            alt=""
                            key={index}
                            onClick={() => {
                              setIsOpenDetailImg(true);
                              setUrlImgDetail(item);
                            }}
                          />
                        );
                      })}
                    </div>
                    <div className={cx("share")}>
                      <span>Share</span>
                    </div>
                  </div>
                ) : (
                  <div className={cx("preloader")}>
                    <div className={cx("loading")}>
                      <span>{pecent}%</span>
                      <div className={cx("pecent")}></div>
                    </div>
                  </div>
                )
              ) : (
                <span onClick={handleSwapFace}>Start</span>
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
      {isOpenDetailImg && (
        <DetailImg
          handleClick={(isOpen) => handleOpenDetail(isOpen)}
          url={urlImgDetail}
        />
      )}
    </>
  );
}

export default NewBorn;
