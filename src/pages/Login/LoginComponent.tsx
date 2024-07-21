import { useState } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { signin, signup } from "../../services/auth";
import { useNavigate } from "react-router";



const cx = classNames.bind(styles);
function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passToggle, setPassToggle] = useState(false);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [deviceRegister, setDeviceRegister] = useState("");
  const navi = useNavigate();
  

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const handleLogin = async () => {
    if (page === 1) {
      if (email === "" || password === "") {
        console.log("Empty");
      } else {
        if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
          const formData = new FormData();
          formData.append("email_or_username", email);
          formData.append("password", password);
          try {
            const response: any = await signin(formData);
            const { message } = response;

            if (message === "Invalid Password!!") {
              alert("Fail Try Again!");
            } else {
              alert("Login Success");
              const account = JSON.stringify(response);
              localStorage.setItem("accessToken", response.token);
              localStorage.setItem("user", account);
              navi(`/profile/edit/${response.id_user}`);
            }
          } catch (error) {
            console.log(error);
            alert("Login Fail");

          }
        } else {
          console.log("Wrong email");
        }
      }
    }
    if (page === 2) {
      if (email === "" || password === "" || name === "") {
        console.log("Empty");
      } else {
        if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
          const newName = email.split("@");
          const formData = new FormData();
          formData.append("user_name", newName[0]);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("ip_register", ipAddress);
          formData.append("device_register", deviceRegister);
          formData.append(
            "link_avatar",
            `https://a0.anyrgb.com/pngimg/1236/14/no-facial-features-no-avatar-no-eyes-expressionless-avatar-icon-delayering-avatar-user-avatar-men-head-portrait-thumbnail.png?fbclid=IwAR3IUCAOlBSThvKijmWXmNuZk-6oEe1q6k-oGQXGr_zd1zWixMIUfAaAyfw`
          );
          try {
            const response: any = await signup(formData);
            const { message } = response;
            if (message === "Account already exists!") {
              alert("Account already exists");
            } else {
              alert("Check Email To Vertify");

              setPage(1);
            }
          } catch (e) {
            console.log("Something wrong!");
          }
        } else {
          console.log("Wrong email");
        }
      }
    }
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
  };

  return (
    <>
      <div className={cx("body")}>
        <div className={cx("body_wrapper", page === 2 && "body_big")}>
          <div className={cx("big_title")}>
            {page === 1 && (
              <>
                <span>Welcome Back</span>
                <span>Enter your Credentials to access your account</span>
              </>
            )}
            {page === 2 && (
              <>
                <span>Get Started Now</span>
              </>
            )}
          </div>
          <div className={cx("account")}>
            {show === true && (
              <div
                className={cx("item_body", "input_name", page === 1 && "leave")}
              >
                <div className={cx("title")}>Name</div>
                <input
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => handleChangeName(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </div>
            )}

            <div
              className={cx(
                "main",
                page === 2 && "register",
                page === 1 && "up"
              )}
            >
              <div className={cx("item_body")}>
                <div className={cx("title")}>Email address</div>
                <input
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => handleChangeEmail(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </div>
              <div className={cx("item_body", "child_2")}>
                <div className={cx("title")}>
                  <div className={cx("item_pass", passToggle && "unable")}>
                    Password
                  </div>
                </div>

                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handleChangePassword(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </div>
              <div className={cx("item_body", "child_3")}>
                <div className={cx("title", "check_box")}>
                  <input type="checkbox" />
                  <div className={cx("item_title")}>
                    {page === 1 && <>Remember for 30days</>}
                    {page === 2 && <>I agree to the terms & policy </>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("box")} onClick={handleLogin}>
            <div className={cx("title")}>
              {" "}
              {page === 1 && <>Login</>}
              {page === 2 && <>Signup</>}
            </div>
          </div>
          <div className={cx("last_line")}>
            <div className={cx("sup")}>
              {page === 1 && (
                <>
                  Don’t have an account ?
                  <span
                    onClick={() => {
                      setPage(2);
                      setShow(true);
                    }}
                  >
                    Sign Up
                  </span>
                </>
              )}
              {page === 2 && (
                <>
                  Have an account ?
                  <span
                    onClick={() => {
                      setPage(1);
                      setName("");
                      setTimeout(() => {
                        setShow(false);
                      }, 1000);
                    }}
                  >
                    Sign In
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
