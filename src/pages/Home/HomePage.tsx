import Footer from "../../components/Footer";

import { useEffect, useState } from "react";

import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Header from "../../components/Header";
import { RoundArrow, RoundArrow_2, RoundArrow_3 } from "../../assets/icon";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const HomePage = () => {
  const [checkUser, setCheckUser] = useState(false);
  const [user, setUser] = useState({ id_user: "", link_avatar: "" });
  useEffect(() => {
    setUser(JSON.parse(String(localStorage.getItem("user"))));
    if (localStorage.getItem("user")) setCheckUser(true);
  }, []);
  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <div className={cx("wrapper")}>
        <Header />
        <div className={cx("part_1")}>
          <div className={cx("left")}>
            <div className={cx("title")}>
              <span>Baby Generator</span>
            </div>
            <div className={cx("text")}>
              <span>
                Discover your future baby's face in seconds with Fotor’s baby
                generator. Magically predict what your baby will look like based
                on the photos of you and your partner, crush, and even
                celebrity! Get hyper-realistic baby prediction pictures and
                share them online with our AI baby maker.
              </span>
            </div>
            <Link to="/swap" className={cx("button")}>
              <span>Get Started</span>
            </Link>
          </div>
          <div className={cx("right")}>
            <div className={cx("baby")}>
              <div className={cx("image")}></div>
            </div>
            <div className={cx("parent")}>
              <div className={cx("father")}></div>

              <div className={cx("mother")}></div>
              <div className={cx("arrow")}>
                <RoundArrow />
              </div>
            </div>
          </div>
        </div>
        <div className={cx("part_2")}>
          <div className={cx("left")}>
            <div className={cx("pic")}></div>
            <div className={cx("title")}>
              <div className={cx("box")}>
                <span>AI</span>
              </div>
              <div className={cx("icon")}>
                <RoundArrow_2 />
              </div>
            </div>
            <div className={cx("phone")}></div>
          </div>
          <div className={cx("right")}>
            <div className={cx("title")}>
              <span>Time Machine</span>
            </div>
            <div className={cx("text")}>
              <span>
                What will our baby look like? You may have wondered about this
                with your partners for a long time. Wonder no more, Fotor's baby
                generator is here to make it a reality! Just upload your and
                your partner’s photos to our baby face generator, and you can
                have your future baby picture instantly. And our inbuiltworks to
                ensure the AI-generated baby that closely mirrors both your
                features. Start to use our baby maker now!
              </span>
            </div>
            <Link to={"/template"} className={cx("button")}>
              <span>Try Time Machine</span>
            </Link>
          </div>
        </div>
        <div className={cx("part_3")}>
          <div className={cx("header")}>
            <span>facebaby-app</span>
            <span>AI technology for fast and easy face swapping</span>
          </div>
          <div className={cx("body")}>
            <div className={cx("left")}>
              <div className={cx("arrow")}>
                <RoundArrow_3 />
              </div>
              <div className={cx("pic")}></div>
              <div className={cx("pic")}></div>
            </div>
            <div className={cx("right")}>
              <div className={cx("text")}>
                <span>
                  Get ready to be spellbound by the AI technology at FunnyFace.
                  Our cutting-edge tech guarantees flawless, natural face swaps,
                  seamlessly concealing any traces of editing. Whether aiming
                  for humour or a creative spark, our user-friendly AI face
                  swapping tool offers unparalleled realism.
                </span>
              </div>
              <div className={cx("button")}>
                <span>Try News Born</span>
              </div>
            </div>
          </div>
          <div className={cx("body")}>
            <div className={cx("box_wrapper")}>
              <div className={cx("box")}></div>
              <div className={cx("box")}></div>
              <div className={cx("box")}></div>
              <div className={cx("box")}></div>
              <div className={cx("box")}></div>
              <div className={cx("box")}></div>
            </div>
          </div>
        </div>
        <div className={cx("part_4")}>
          <div className={cx("left")}>
            <div className={cx("text")}>
              <span>
                Get ready to be spellbound by the AI technology at FunnyFace.
                Our cutting-edge tech guarantees flawless, natural face swaps,
                seamlessly concealing any traces of editing. Whether aiming for
                humour or a creative spark, our user-friendly AI face swapping
                tool offers unparalleled realism.
              </span>
            </div>
            <div className={cx("button")}>
              <span>Try News Born</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
