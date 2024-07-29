import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Setting.module.scss";
import { CloudLeft, CloudRight } from "../../assets/icon";
import { BearIcon } from "../../assets/svg/bear";
import { Pink_1, Pink_2 } from "../../assets/svg/pinkCloud";
import { Heart, Star } from "../../assets/svg/star";
import { Baby } from "../../assets/svg/baby";
import Header from "../../components/Header";
import images from "../../assets/images";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { changePassword } from "../../services/auth";

const cx = classNames.bind(styles);
export default function Setting() {
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
  const [changePass, setChangePass] = useState(false);
  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { id } = useParams();

  const navi = useNavigate();

  const handleInPass = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPass(e.target.value);
  };

  const handleConfirmPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
  };

  const handleSubmitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPass === confirmPass) {
      const formData = new FormData();
      formData.append("old_password", pass);
      formData.append("new_password", newPass);
    //   console.log(formData);
    //   console.log(oldPass);
    //   console.log(pass);
      try {
        const res = await changePassword(formData, id);
        console.log(res);
        setChangePass(false);
        alert("Change Password Success");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Password Incorrect!.");
    }
  };

  const handleLogout=() => {
    localStorage.clear();
      navi("/login");
  };
 
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    axios
      .get(`https://databaseswap.mangasocial.online/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      });
  }, []);
  if (changePass) {
    return (
      <>
        <div className={cx("wrapper")}>
          <div className={cx("image_head")}>
            <Heart />
          </div>
          <div className={cx("body")}>
            <Header />
            <div className={cx("container")}>
              <form className={cx("login-method")} onSubmit={handleSubmitForm}>
                <div className={cx("list")}>
                  <span>Change Password</span>
                  <div className={cx("item")}>
                    <strong>Email</strong>
                    <span>{user?.email}</span>
                  </div>

                  <div className={cx("item")}>
                    <strong>Password</strong>
                    <input
                      type="password"
                      onChange={(e) => {
                        handleInPass(e);
                      }}
                    />
                  </div>
                  <div className={cx("item")}>
                    <strong>New Password</strong>
                    <input
                      type="password"
                      onChange={(e) => {
                        handleChangePass(e);
                      }}
                    />
                  </div>
                  <div className={cx("item")}>
                    <strong>Confirm Password</strong>
                    <input
                      type="password"
                      onChange={(e) => {
                        handleConfirmPass(e);
                      }}
                    />
                  </div>
                  <div className={cx("btn")}>
                    <span
                      onClick={() => {
                        setChangePass(false);
                      }}
                    >
                      Back
                    </span>
                    <button type="submit">Save</button>
                  </div>
                </div>
              </form>
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
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("image_head")}>
          <Heart />
        </div>
        <div className={cx("body")}>
          <Header />
          <div className={cx("container")}>
            <div className={cx("login-method")}>
              <h1>Current login method</h1>
              <div className={cx("list")}>
                <span>
                  <img src={images.icSms} alt="" /> Email & Password
                </span>
                <div className={cx("item")}>
                  <strong>Email</strong>
                  <span>{user?.email}</span>
                </div>

                <div className={cx("item")}>
                  <strong>
                    Password{" "}
                    <span
                      onClick={() => {
                        setChangePass(true);
                      }}
                    >
                      Change
                    </span>
                  </strong>
                  <span>***********</span>
                </div>
              </div>
            </div>

            <div className={cx("current-method")}>
              <h1>Current login method</h1>
              <div className={cx("list")}>
                <div className={cx("item")}>
                  <span>
                    <img src={images.icGg} alt="" /> Google
                  </span>
                </div>

                <div className={cx("item")}>
                  <span>
                    <img src={images.icFb} alt="" /> Facebook
                  </span>
                </div>
              </div>
            </div>

            <div className={cx("logout")}>
              <h1>Log out</h1>
              <div className={cx("item")}>
                <span onClick={handleLogout}>
                  <img src={images.icLogout} alt="" /> Log out
                </span>
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
    </>
  );
}
