import { useState } from "react";
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
const cx = classNames.bind(styles);
function NewBorn() {
  const [switchToggle, setSwitchToggle] = useState(true);
  const [picOne, setPicOne] = useState("");
  const [picTwo, setPicTwo] = useState("");
  const [link1, setLink1] = useState<any>("");
  const [link2, setLink2] = useState<any>("");
  const [linkSwapImage, setLinkSwapImage] = useState<{
    link_anh_swap: string[];
  }>({
    link_anh_swap: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const navi = useNavigate();

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
      console.log("here");

      if (pic === 2) {
        const formData = new FormData();
        formData.append("src_img", e.target.files[0]);
        let res2 = await uploadImageSwap(formData, 241, "nam");
        setLink2(res2);
        // console.log("here");
        setPicTwo(URL.createObjectURL(e.target.files[0]));
      }
      if (pic === 3) {
        // const formData = new FormData();
        // formData.append("src_img", e.target.files[0]);
        // let res2 = await uploadImageSwap(formData, 241, "nam");
        // setLink2(res2);
        // console.log("here");
        setLink2(e.target.files[0]);
        setPicTwo(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const handleSwapFace = async () => {
    console.log("Click Swap");

    const browser = window.navigator.userAgent;
    const ip = "unknown";
    try {
      setIsLoading(true);

      const { data } = await axios.get(
        `https://admin.funface.online/getdata/swap/listimage_baby_family`,
        {
          params: {
            device_them_su_kien: browser,
            ip_them_su_kien: ip,
            id_user: userId,
            list_folder: "baby_family1",
          },

          headers: {
            link1: link1,
            link2: link2,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(JSON.parse(data[0].body));
      const listImgs = JSON.parse(data[0].body);
      console.log(listImgs);
      setLinkSwapImage(listImgs);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(link1);
  console.log(link2);
  console.log(linkSwapImage.link_anh_swap);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("image_head")}>
          <Heart />
        </div>
        <Header />
        <div className={cx("image_middle")}>
          <MomAndDad />
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
                  <label htmlFor="pic1" className={cx("in-pic")}></label>
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
                  <label htmlFor="pic2" className={cx("in-pic")}></label>
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
                linkSwapImage && linkSwapImage?.link_anh_swap.length > 0 ? (
                  <div className={cx("result")}>
                    <div className={cx("img-swap")}>
                      {linkSwapImage.link_anh_swap.map((item, index) => {
                        return <img src={item} alt="" key={index} />;
                      })}
                    </div>
                    <div className={cx("share")}>
                      <span>Share</span>
                    </div>
                  </div>
                ) : (
                  <div className={cx("preloader")}>
                    <div className={cx("loading")}></div>
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
    </>
  );
}

export default NewBorn;
