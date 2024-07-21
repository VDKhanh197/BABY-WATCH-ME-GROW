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

const cx = classNames.bind(styles);
function NewBorn() {
  const [switchToggle, setSwitchToggle] = useState(true);
  const [picOne, setPicOne] = useState("");
  const [picTwo, setPicTwo] = useState("");
  const [link1, setLink1] = useState<any>("");
  const [link2, setLink2] = useState<any>("");
  const [linkSwapImage, setLinkSwapImage] = useState("");
  const navi = useNavigate();

  const handleSwitchPage = (value: boolean) => {
    setSwitchToggle(value);
    setPicTwo("");
    setLink2("");
    setLinkSwapImage("");
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
    if (switchToggle === true) {
      console.log("Click Swap");

      const res = await swapImage(link1, link2);
      console.log(res);
      if (res) {
        setLinkSwapImage(res.sukien_2_image.link_da_swap);
      }
    }
    if (switchToggle === false) {
      console.log("Here");
      const formData = new FormData();
      formData.append("src_vid", link2);
      const res = await swapVideo(link1, formData);
      console.log(res);
      if (res) {
        setLinkSwapImage(res.sukien_swap_video.link_vid_da_swap);
      }
    }
  };
  console.log(link1);
  console.log(link2);

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
            <input type="file"/>
            <input type="file"/>
          </div>
          <div className={cx("action")}>
              <span>
                Start
              </span>
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
