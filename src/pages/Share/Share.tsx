import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Share.module.scss";
import { CloudLeft, CloudRight } from "../../assets/icon";
import { BearIcon } from "../../assets/svg/bear";
import { Pink_1, Pink_2 } from "../../assets/svg/pinkCloud";
import { Heart, Star } from "../../assets/svg/star";
import { Baby } from "../../assets/svg/baby";
import Header from "../../components/Header";
import images from "../../assets/images";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { uploadImageSwap } from "../../services/image";
import DetailImg from "../../components/DetailImg/DetailImg";

type listItemType = {
  id?: number;
  id_saved: string;
  link_video_goc?: string;
  link_image?: string;
  link_video_da_swap: string;
  link_da_swap: string;
  thoi_gian_su_kien?: string;
  id_user?: string;
};

interface Comment {
  avatar_user: "";
  noi_dung_cmt: "";
  user_name: "";
}
const cx = classNames.bind(styles);
export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState<any>({
    user_name: "",
    email: "",
    link_avatar: "",
    id_user: "",
    count_comment: 0,
    count_sukien: 0,
    count_view: 0,
    device_register: "",
  });

  const [avt, setAvt] = useState(user.link_avatar);
  const [isEdit, setIsEdit] = useState(false);
  const [listTemp, setListTemp] = useState<listItemType[] | []>([
    { id_saved: "", link_video_da_swap: "", link_da_swap: "" },
  ]);
  const [listCmt, setListCmt] = useState([]);
  const [countCM, setCountCM] = useState(1);
  const [type, setType] = useState("Event");
  const [isOpenDetailImg, setIsOpenDetailImg] = useState(false);
  const [urlImgDetail, setUrlImgDetail] = useState("");

  const navi = useNavigate();

  const handleOpenDetail = (isOpen: boolean) => {
    setIsOpenDetailImg(isOpen);
  };

  const handleChangeContent = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setType(e.target.value);
  };

  useEffect(() => {
    //@ts-ignore
    axios
      .get(`https://databaseswap.mangasocial.online/profile/${id}`)
      .then((res) => {
        setUser(res.data);
      });
  }, []);
  useEffect(() => {
    if (type === "Event") {
      axios
        .get(
          `https://api.watchmegrow.online/get/list_video/id_user_swap?id_user=${id}`
        )
        .then((res) => {
          setListTemp(res.data.list_sukien_video);
        });
    }
    if (type === "Newborn") {
      axios
        .get(
          `https://api.watchmegrow.online/get/list_image/all_image_swap?type=newborn&id_user=${id}`
        )
        .then((res) => {
          console.log(res);
          setListTemp(res.data);
        });
    }
    if (type === "Generator") {
      axios
        .get(
          `https://api.watchmegrow.online/get/list_image/all_image_swap_generate?id_user=${id}`
        )
        .then((res) => {
          setListTemp(res.data);
        });
    }
    if (type === "mom") {
      axios
        .get(
          `https://api.watchmegrow.online/get/list_image/all_image_swap_mom_baby?id_user=${id}&type=mom_and_baby`
        )
        .then((res) => {
          setListTemp(res.data);
        });
    }
  }, [type]);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("image_head")}>
          <Heart />
        </div>
        <div className={cx("body")}>
          {localStorage.getItem("accessToken") && <Header />}
          <div className={cx("container")}>
            <div className={cx("banner")}>
              <div className={cx("avatar")}>
                {user.link_avatar ? (
                  <label htmlFor="avt">
                    <img
                      src={user.link_avatar.replace("futurelove.online","photo.gachmen.org")}
                      className={cx("imgAvt")}
                      alt=""
                      onClick={() => {
                        setUrlImgDetail(user.link_avatar);
                        setIsOpenDetailImg(true);
                      }}
                    />
                  </label>
                ) : (
                  <label htmlFor="">
                    <img src={images.camera} alt="" />
                    <span>Upload image</span>
                  </label>
                )}
              </div>
              <div className={cx("info")}>
                <span>Album of {user.user_name}</span>
              </div>
            </div>

            <div className={cx("content")}>
              <div className={cx("left")}>
                <select name="" id="" onChange={(e) => handleChangeContent(e)}>
                  <option value="Event">Video</option>
                  <option value="Generator">Generator</option>
                  <option value="Newborn">Newborn</option>
                  <option value="mom">Mom and baby</option>
                </select>
                <div className={cx("event")}>
                  {listTemp &&
                    listTemp.map((item, index) => {
                      //   console.log(item);
                      if (type === "Event") {
                        const string = item.link_video_da_swap;
                        const src = string.replace(
                          "futurelove.online",
                          "photo.gachmen.org"
                        );
                        return (
                          <div className={cx("vid")} key={index}>
                            <video src={src} controls />
                          </div>
                        );
                      } else {
                        const string = item.link_da_swap;
                        const src = string?.replace(
                          "futurelove.online",
                          "photo.gachmen.org"
                        ) as string;
                        return (
                          <div className={cx("vid")} key={index}>
                            <img
                              src={src}
                              alt=""
                              onClick={() => {
                                setUrlImgDetail(src);
                                setIsOpenDetailImg(true);
                              }}
                            />
                          </div>
                        );
                      }
                    })}
                </div>
              </div>

              {/* <div className={cx("right")}>
                <h1>Comments</h1>
                <div className={cx("list-cmt")}>
                  {listCmt &&
                    listCmt.map((item: Comment, index: number) => {
                      return (
                        <div className={cx("item")} key={index}>
                          <img src={item.avatar_user} alt="" />
                          <div className={cx("mess")}>
                            <strong>{item.user_name}</strong>
                            <span>{item.noi_dung_cmt}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div> */}
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
      {isOpenDetailImg && (
        <DetailImg
          handleClick={(isOpen) => handleOpenDetail(isOpen)}
          url={urlImgDetail}
        />
      )}
    </>
  );
}
