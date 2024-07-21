import { AppStore, CHPlay, CopyRight } from "../assets/icon";
import styles from "../styles/componentsStyles/Footer.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("box")}>
            <span className={cx("title")}>Contact us</span>
            <span className={cx("title")}>Term of Use</span>
            <span className={cx("title")}>Privacy Policy</span>
          </div>
          <div className={cx("box")}>
            <div className={cx("app")}>
              <div className={cx("child")}>
                <div className={cx("icon")}>
                  <CHPlay />
                </div>
                <div className={cx("text_box")}>
                  <span>Get it on</span>
                  <span>Google Play</span>
                </div>
              </div>
              <div className={cx("child")}>
                <div className={cx("icon")}>
                  <AppStore />
                </div>
                <div className={cx("text_box")}>
                  <span>Get it on</span>
                  <span>App Store</span>
                </div>
              </div>
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
