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
import DetailImg from "../../components/DetailImg/DetailImg";
import { Console } from "console";

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

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("accessToken");
  const [avt, setAvt] = useState("");
  const [avtTmp, setAvtTmp] = useState("");
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
  const handleInputImg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    pic: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      const file: File = e.target.files[0];
      const formData = new FormData();
      // const data
      if (file && e.target.files[0]) {
        formData.append("src_img", file);
        await axios
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
            setAvtTmp(res.data);
          });
      }
      setAvt(URL.createObjectURL(e.target.files[0]));
      console.log(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleChangeAvt = async () => {
    setIsEdit(false);
    await axios
      .post(
        `https://databaseswap.mangasocial.online/changeavatar/${userId}`,
        {
          link_img: avtTmp,
          check_img: "upload",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setAvt(res.data);
        console.log(res.data);
        alert("Update avatar successfully!");
      });
  };

  useEffect(() => {
    axios
      .get(`https://databaseswap.mangasocial.online/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  }, [avt]);
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
          <Header />
          <div className={cx("container")}>
            <div className={cx("banner")}>
              <div className={cx("avatar")}>
                {user.link_avatar ? (
                  <label htmlFor="" onClick={() => setIsEdit(true)}>
                    <img
                      src={user.link_avatar}
                      className={cx("imgAvt")}
                      alt=""
                    />
                  </label>
                ) : (
                  <label htmlFor="" onClick={() => setIsEdit(true)}>
                    <img src={images.camera} alt="" />
                    <span>Upload image</span>
                  </label>
                )}
                <input
                  type="file"
                  id="avt"
                  hidden={true}
                  onChange={(e) => {
                    handleInputImg(e, 1);
                  }}
                />
              </div>

              {/* <div className={cx("background")}>
                <label htmlFor="backgd">
                  <img src={images.camera} alt="" />
                  <span>Change cover</span>
                </label>
                <input type="file" id="backgd" hidden={true} />
              </div> */}
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
                  <img
                    src={images.setting}
                    alt=""
                    onClick={() => {
                      navi(`/setting/${user.id_user}`);
                    }}
                  />
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
                        return (
                          <div
                            className={cx("vid")}
                            key={index}
                            onClick={() => {
                              navi(`/share/${userId}`);
                            }}
                          >
                            <video src={item.link_video_da_swap} controls />
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className={cx("vid")}
                            key={index}
                            onClick={() => {
                              navi(`/share/${userId}`);
                            }}
                          >
                            <img
                              src={item.link_da_swap}
                              alt=""
                              onClick={() => {
                                setIsOpenDetailImg(true);
                                setUrlImgDetail(item.link_da_swap);
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
                avtTmp ? (
                  <label htmlFor="avt">
                    <img src={avt} className={cx("imgAvt")} alt="" />
                  </label>
                ) : (
                  <label htmlFor="avt">
                    <img
                      src={user.link_avatar}
                      className={cx("imgAvt")}
                      alt=""
                    />
                  </label>
                )
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
                  <span onClick={handleChangeAvt}>Save</span>
                </div>
              </div>
            </div>
          </form>
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
