import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
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

type listItemType = {
  id?: number;
  id_saved: string;
  link_video_goc?: string;
  link_image?: string;
  link_video_da_swap: string;
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
  const token = localStorage.getItem("accessToken");
  const [avt, setAvt] = useState(user.link_avatar);
  const [isEdit, setIsEdit] = useState(false);
  const [listTemp, setListTemp] = useState<listItemType[] | []>([
    { id_saved: "", link_video_da_swap: "" },
  ]);
  const [listCmt, setListCmt] = useState([]);
  const [countCM, setCountCM] = useState(1);

  const navi = useNavigate();

  const handleChangeAvt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      const formData = new FormData();
      formData.append("src_img", e.target.files[0]);
      let res1 = await uploadImageSwap(formData, "nu");
      axios
        .post(
          `https://databaseswap.mangasocial.online/changeavatar/${user.id_user}`,
          {
            link_img: res1,
            check_img: "upload",
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          // setAvt(res.data);
          console.log(res.data);
          alert("Update avatar successfully!");
        });
    }
  };

  

  useEffect(() => {
    axios
      .get(
        `https://api.watchmegrow.online/get/list_video/id_user_swap?id_user=${id}`
      )
      .then((res) => {
        setListTemp(res.data.list_sukien_video);
      });
  }, [id]);
  useEffect(() => {
    //@ts-ignore
    axios
      .get(`https://databaseswap.mangasocial.online/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .then(() => {
        user.link_avatar.includes("/var/www/build_futurelove/")
          ? setAvt(
              `https://futurelove.online/${user.link_avatar.replace(
                "/var/www/build_futurelove/",
                ""
              )}`
            )
          : setAvt(user.link_avatar);
      });
  }, [user]);
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user') || "").id_user;
    const fecthData = async ()=>{
      const {data} = await axios.get(
        `https://databaseswap.mangasocial.online/lovehistory/pageComment/${countCM}?id_user=${userId}`
      )
        setListCmt(data.comment);
        console.log(data.comment);

    }
    fecthData();

  }, []);
  //   const [currentUser, setCurrentUser] = useState({
  //     id_user: "",
  //     link_avatar: "",
  //     ip_register: "",
  //   });
  //   useEffect(() => {
  //     if (localStorage.getItem("user")) {
  //       setCurrentUser(JSON.parse(localStorage.getItem("user") || ""));
  //     }
  //   }, []);
  // console.log(listCmt);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("image_head")}>
          <Heart />
        </div>
        <div className={cx("body")}>
          <Header />
          <div className={cx("container")}>
            <div className={cx("banner")}>
              <div className={cx("avatar")}>
                {user.link_avatar ? (
                  <label htmlFor="avt">
                    <img src={avt} className={cx("imgAvt")} alt="" />
                  </label>
                ) : (
                  <label htmlFor="avt">
                    <img src={images.camera} alt="" />
                    <span>Upload image</span>
                  </label>
                )}
                <input
                  type="file"
                  id="avt"
                  hidden={true}
                  onChange={(e) => {
                    handleChangeAvt(e);
                  }}
                />
              </div>

              <div className={cx("background")}>
                <label htmlFor="backgd">
                  <img src={images.camera} alt="" />
                  <span>Change cover</span>
                </label>
                <input type="file" id="backgd" hidden={true} />
              </div>
            </div>

            <div className={cx("info")}>
              <div className={cx("line1")}>
                <strong>
                  {user.user_name ? user.user_name : "@trung hieu"}
                </strong>
                <div className={cx("btn-edit")}>
                  <span
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  >
                    Edit profile
                  </span>
                  <img src={images.setting} alt="" onClick={()=> {navi(`/setting/${user.id_user}`)}}/>
                </div>
              </div>

              <div className={cx("line2")}>
                <span>
                  <strong>{user.count_sukien}</strong> events
                </span>
                <span>
                  <strong>{user.count_view}</strong> views
                </span>
                <span>
                  <strong>{user.count_comment}</strong> comments
                </span>
              </div>
            </div>

            <div className={cx("content")}>
              <div className={cx("left")}>
                <h1>Event</h1>
                <div className={cx("event")}>
                  {listTemp &&
                    listTemp.map((item, index) => {
                      //   console.log(item);
                      return (
                        <div className={cx("vid")} key={index}>
                          <video src={item.link_video_da_swap} controls />
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className={cx("right")}>
                <h1>Comments</h1>
                <div className={cx("list-cmt")}>
                  {listCmt &&
                    listCmt.map((item:Comment, index:number) => {
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
      {isEdit && (
        <div className={cx("edit")}>
          <form action="">
            <div className={cx("title")}>
              <h1>Profile</h1>
              <img
                src={images.icClose}
                alt=""
                onClick={() => {
                  setIsEdit(false);
                }}
              />
            </div>

            <div className={cx("form")}>
              {user.link_avatar ? (
                <label htmlFor="avt">
                  <img src={avt} className={cx("imgAvt")} alt="" />
                </label>
              ) : (
                <label htmlFor="avt">
                  <img src={images.camera} alt="" />
                  <span>Upload image</span>
                </label>
              )}
              <div className={cx("form-content")}>
                <input type="text" placeholder="@hieu" />
                <div className={cx("btn")}>
                  <label htmlFor="avt">Upload image</label>
                  <span
                    onClick={() => {
                      setIsEdit(false);
                    }}
                  >
                    Save
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
