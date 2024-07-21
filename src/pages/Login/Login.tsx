
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { LargeBear } from "../../assets/svg/largeBear";
import LoginComponent from "./LoginComponent";
import Header from "../../components/Header";


const cx = classNames.bind(styles);
function Login() {
  const handleDownload = () => {
    console.log("Download");
  };
  return (
    <>
      <div className={cx("wrapper")}>
        {/* <div className={cx("image_head")}>
          <Heart />
        </div> */}
        <Header />

        <LoginComponent />
        <div className={cx("image_bottom")}>
          <LargeBear />
        </div>
      </div>
    </>
  );
}

export default Login;
