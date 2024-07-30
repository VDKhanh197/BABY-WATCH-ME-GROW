import { useEffect, useState } from "react";
import styles from "./Swap.module.scss";
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
import images from "../../assets/images";
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


const cx = classNames.bind(styles);
function Swap() {
  const [switchToggle, setSwitchToggle] = useState(true);
  const [picOne, setPicOne] = useState("");
  const [picTwo, setPicTwo] = useState("");
  const [link1, setLink1] = useState<any>("");
  const [link2, setLink2] = useState<any>("");
  const [linkSwapImage, setLinkSwapImage] = useState("");
  const [loading, setLoading] = useState(false);
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
  
  const userId = localStorage.getItem('userId');
  console.log("User Id: " + userId);
  const token = localStorage.getItem("accessToken");
  console.log("token: " + token);

  const handleSwitchPage = (value: boolean) => {
    setSwitchToggle(value);
    setPicTwo("");
    setLink2("");
    setLinkSwapImage("");
  };
  const downloadImage = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = linkSwapImage;
    link.setAttribute('download', "linkSwapImage.jpg");

    // Append the anchor to the DOM, click it, and then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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

        console.log("here");
        setLink2(e.target.files[0]);
        setPicTwo(URL.createObjectURL(e.target.files[0]));
      }
    }
  };
  console.log(linkSwapImage);
  const handleSwapFace = async () => {
    setLoading(true);
    console.log("Click Swap");
    try {
      const browser = window.navigator.userAgent;
      const ip = "unknown";
      const { data} = await axios.get(`https://admin.funface.online/getdata/sukien/baby`,
        {
          params: {
            device_them_su_kien: browser,
            ip_them_su_kien: ip,
            id_user: userId,
          },
          
          headers: {
            linknam: link1,
            linknu: link2,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data){
        setLinkSwapImage(data.sukien_baby[0].link_da_swap);
      }
      
    } catch (error) {
      alert("login to continue...");
      navi("/login");
      console.log(error);
    }
  };
  console.log(link1);
  console.log(link2);

  useEffect(() => {
    setLink2(link2);
  }, [link2]);
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
            <div className={cx("action")}>
              <div className={cx("pic")}>
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
              <div className={cx("swap")}>
                <img src={images.icHeart} alt="" />
                <span onClick={handleSwapFace}>Start</span>
              </div>

              <div className={cx("pic")}>
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
            <div className={cx("box-result")}>
              <div className={cx("result")}>
                {loading ? (
                  linkSwapImage === "" ? (
                    <div className={cx("preloader")}>
                      <div className={cx("loading")}></div>
                    </div>
                  ) : (
                    <img src={linkSwapImage} alt="" />
                  )
                ) : (
                  <></>
                )}
              </div>
              <img src={images.icDownLoad} alt="" onClick={downloadImage}/>
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

export default Swap;
