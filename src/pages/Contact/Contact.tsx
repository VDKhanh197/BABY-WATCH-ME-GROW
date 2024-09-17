import Footer from "../../components/Footer";

import { useEffect, useState } from "react";

import styles from "./Contact.module.scss";
import classNames from "classnames/bind";
import Header from "../../components/Header";
import {
    RoundArrow,
    RoundArrow_2,
    RoundArrow_3,
    IcArrow,
    PlayIcon,
    IcArrow2,
} from "../../assets/icon";
import { Link, useNavigate } from "react-router-dom";
import images from "../../assets/images";
const cx = classNames.bind(styles);

const Contact = () => {
    return (
        <>
            <div className={cx("wrapper")}>
                <Header />
                <div className={cx("content")}>
                    <h1 className={cx("title",)} style={{ width: "100%", textAlign: "center" }}>Contact Us</h1>
                    <span className={cx("description")}>
                        Watchmegrow software is a software created by ThinkAI company, our development team has built an AI system based on your face to generate future images of your children, and will also generate videos of your children's growth. We have very high security requirements and do not store your faces, nor share or sell that data to anyone, the product is great. Main features
                    </span>
                    <div className={cx("chapter")}>
                        <ul>
                            <li>generate photos of your future children</li>
                            <li>generate videos of your children's growth</li>
                            <li>generate newborn photos of your children</li>
                            <li>{'generate photos of your future family (collection)'}</li>
                            <li>generate funny videos of your children in the future</li>
                        </ul>
                    </div>

                    <div className={cx("chapter")}>
                        <h2 className={cx("title")}>
                            {`Sent me something <3 (Email:`}<a href="/">nguyendinhthanhiospro@gmail.com</a> {`)`}
                        </h2>
                        <div className={cx("box")}>
                            <input type="text" placeholder="Name" required />
                            <input type="email" placeholder="Your Email" required />
                            <input type="text" name="" id="" placeholder="Phone Number" />
                            <input type="text" name="" id="" placeholder="Message" />
                            <button>Send</button>
                        </div>

                    </div>

                </div>
                <Footer />
            </div>
        </>
    );
};

export default Contact;
