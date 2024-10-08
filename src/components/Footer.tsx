import { useNavigate } from "react-router";
import { AppStore, CHPlay, CopyRight } from "../assets/icon";
import styles from "../styles/componentsStyles/Footer.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Footer = () => {
  const navi = useNavigate();
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("box")}>
            <span
              className={cx("title")}
              onClick={() => navi('/contact')}
            >Contact us</span>
            <span className={cx("title")}>Term of Use</span>
            <span
              className={cx("title")}
              onClick={() => navi('/privacy')}
            >Privacy Policy</span>
          </div>
          <div className={cx("box")}>
            <div className={cx("app")}>
              <a href="https://play.google.com/store/apps/details?id=com.xuanduy2309.BABYWATCHMEGROWIOS&pli=1">
                <div className={cx("child")}>
                  <div className={cx("icon")}>
                    <CHPlay />
                  </div>
                  <div className={cx("text_box")}>
                    <span>Get it on</span>
                    <span>Google Play</span>
                  </div>
                </div>
              </a>
              <a href="https://apps.apple.com/us/app/ai-video-generator-dream-face/id6670520822">
                <div className={cx("child")}>
                  <div className={cx("icon")}>
                    <AppStore />
                  </div>
                  <div className={cx("text_box")}>
                    <span>Get it on</span>
                    <span>App Store</span>
                  </div>
                </div>
              </a>
            </div>
            <div className={cx("license")}>
              <span>Copyright by Funny face</span>
              <span>
                <CopyRight />
              </span>
              <span>2024</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
