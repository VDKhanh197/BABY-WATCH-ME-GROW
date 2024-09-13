import Footer from "../../components/Footer";

import { useEffect, useState } from "react";

import styles from "./PrivacyPolicy.module.scss";
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

const HomePage = () => {
  const [checkUser, setCheckUser] = useState(false);
  const [user, setUser] = useState({ id_user: "", link_avatar: "" });

  const navigate = useNavigate();

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
        <div className={cx("content")}>
          <h1 className={cx("title",)} style={{width:"100%",textAlign:"center"}}>Privacy Policy</h1>
          <span className={cx("description")}>This Privacy Policy explains how Watchmegrow collects, uses, and shares information about you when you use the "Watch Me Grow - Baby Generator" application. By using this application, you agree to the terms outlined in this policy.
          </span>
          <div className={cx("chapter")}>
            <h2 className={cx("title")}>1. Purpose of Information Collection</h2>
            <span className={cx("description")}>
              The automatically processed information has the following purposes:
            </span>
            <ul>
              <li>To operate and update the Software and the Service and to provide you with existing and new functionality and features.
              </li>
              <li>To develop and customize the Software and Service.</li>
              <li>To maintain, test, monitor, and improve the quality and operation of the Software and the Service.
              </li>
            </ul>
            <span className={cx("description")}>
              While we have no intention of collecting any Personally Identifiable Information ("PII") (except as outlined in this Privacy Policy), the data collected may still contain PII. As part of our privacy measures, email addresses, social security numbers, credit card numbers, etc. We apply certain rules designed to prevent the unintentional collection of PII. Such rules are based on known field types, values, parameters, and algorithms, but they are not perfect and therefore the Software and Services may sometimes unintentionally collect undesirable information. We regularly review and update these rules to prevent this from happening. You can withdraw your consent at any time by contacting us.
            </span>
          </div>

          <div className={cx("chapter")}>
            <h2 className={cx("title")}>
              2. Payment Data
            </h2>
            <span className={cx("description")}>We may collect information about your subscription orders, such as purchase items, subscription time, order status, and payment time. We do not collect and we are not responsible for the collection or security of payment details. Payment information is processed and stored using third-party companies (such as Apple). These companies can be contacted through their websites. Before entering your personal payment details, we suggest that you read and become familiar with the privacy policy of these third-party companies.
            </span>
          </div>

          <div className={cx("chapter")}>
            <h2 className={cx("title")}>3. Sharing Information with Third-Parties</h2>
            <span className={cx("description")}>We will not share any information we collect except for the following events:</span>
            <ul>
              <li>If we are required to disclose it by law, we may share the information with law enforcement or other authorities and any third party that may be required (for example, to detect, prevent, or otherwise address fraud, security or technical issues; follow any legal process, subpoena, or government request, or to protect the rights, property, or personal safety of our users, their partners, or the general public).
              </li>
              <li>If we go through a business transition, such as a merger or takeover, consolidation, change of control, restructuring, or sale of all or part of its assets, your information will be among the assets transferred.
              </li>
              <li>We may share information with certain third parties (including but not limited to search engines, content providers, and ad networks and platforms) that provide various services (such as advertising, marketing, analytics, content, and search) in connection with the software and service. We take appropriate measures to ensure that no individual user can be identified from the disclosure of such information, and we require that these third parties (i) keep the data secure, (ii) not misuse the data, and (iii) use data only by applicable data protection laws and this Privacy Policy.
              </li>
              <li>We may also share non-personally identifiable information with our subsidiaries, affiliates, and parent companies, but their use of such information must comply with applicable data protection laws and this Privacy Policy. We may use third-party Service Providers to monitor and analyze the use of our application.
              </li>
            </ul>
          </div>

          <div className={cx("chapter")}>
            <h2 className={cx("title")}>4. Information may be collected by Third-Parties</h2>
            <span className={cx("description")}>
              Certain Services may contain content that links to advertisements, websites, products, and other services provided by third parties on our Software (collectively, "Third Party Services"). Use of such Third Party Services is subject to their privacy policies. You will be aware that the use of Third Party Services may give these third parties the ability to access, collect, store and/or share both your personal and non-personally identifiable information. To clarify, we do not review, endorse, monitor, support, warrant or represent such Third Party Services and your access to any Third Party Services is at your own risk. We are not responsible for the information contained and/or made available by your Applications, for your use or inability to use such Third Party Services. You expressly exempt us from any liability arising from your use of such Third Party Services. We recommend that you read the terms, conditions, and privacy policies of such third parties before using or accessing any of them. In addition, Third-Party advertising companies may collect or use your PII (excluding your name, address, email address, or telephone number) when you use the Software or Service to provide customized advertising. If you would like to learn more about this app and your preferences about not using this functionality or sharing this information with these companies, please contact Third-Party advertising companies directly.

            </span>
          </div>

          <div className={cx("chapter")}>
            <h2 className={cx("title")}>
              5. Transfer of Data
            </h2>
            <span className={cx("description")}>
              Software and Services run over the Internet. We may store and process information in various parts of the world. We and third-party organizations that provide automated data processing technologies for the Software or our third-party advertising partners may transfer automatically processed information across borders and from your country or jurisdiction to other countries or jurisdictions around the world.
            </span>
          </div>

          <div className={cx("chapter")}>
            <h2 className={cx("title")}>
              6. Security of Your Information
            </h2>
            <span className={cx("description")}>
              The security of your information is our top priority and we take strict measures to protect data from unauthorized access, use, disclosure, or destruction. We have implemented physical, technical, and administrative security measures for the Services that comply with applicable laws and industry standards. For example, we use firewalls, encryption technology, and network access designed to protect against fraud and identity theft; Our data is stored only in centers that provide high-level security for user information. In addition, we protect the privacy of the user by trying to minimize the amount of sensitive data and PII. In addition, we demand appropriate contractual protection from our partners regarding the processing of user data. However, please note that no method of transferring or storing information over the Internet is completely secure. Accordingly, we cannot guarantee the absolute security of any information.
            </span>
          </div>

          <div className={cx("chapter")}>
            <h2 className={cx("title")}>
              7. Push Notification
            </h2>
            <span className={cx("description")}>
              With your consent, we may send push notifications to your mobile device to provide app updates and other relevant messages.
            </span>
          </div>

          <div className={cx("chapter")}>
            <h2 className={cx("title")}>
              8. Cookies
            </h2>
            <span className={cx("description")}>
              A cookie is a small file that asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site.
            </span>
            <span className={cx("description")}>
              "AI Baby Generator: Face Maker" uses "Cookies" to determine the areas of our website you visit. A cookie is a small piece of data stored by your web browser on your computer or mobile device. We use Cookies to improve the performance and functionality of our app, but they are not necessary for their use. However, without these cookies, certain functions such as videos may not be available, or you may need to enter your login information each time you visit the app, as we cannot remember your previous login. Most web browsers can be set to disable the use of Cookies. However, if you disable Cookies, you may not be able to access functions on our website correctly or at all. We never place Personally Identifiable Information in Cookies. We use cookies for tracking session information and not stored on our side. All of your data is stored locally on your device.
            </span>
          </div>

          <div className={cx("chapter")}>
            <h2 className={cx("title")}>
              9. Data Retention
            </h2>
            <span className={cx("description")}>
              We retain the information we collect as described in this Privacy Policy as necessary for the provision of the Services, internal analytical purposes, or to comply with its legal obligations, resolve disputes, and enforce agreements (e.g., settlement). The criteria used to determine the retention periods include:

            </span>
            <ul>
              <li>How long the personal data is needed to provide the Services and operate the business.</li>
              <li>The type of personal data collected.</li>
              <li>Whether we are subject to a legal, contractual, or similar obligation to retain the data (e.g., mandatory data retention laws, government orders to preserve data relevant to an investigation, or data that must be retained for litigation or disputes).</li>
            </ul>
          </div>

          <div className={cx("chapter")}>
            <h2 className={cx("title")}>
              10. Your Data Rights
            </h2>
            <span className={cx("description")}>
              You have the right to access, change, correct, or delete any personal data that you may have collected. If you are in the EEA, you have the right (with limited exceptions) to:
            </span>
            <ul>
              <li>Access your personal information and request its rectification or deletion.</li>
              <li>Restrict or object to the processing of your personal information.</li>
              <li>Request a copy of your personal information in digital format.</li>
            </ul>
            <span className="description">
              You also have the right to complain to your local data protection authority in the EEA about the processing of your personal information. To exercise this right, please contact our Data Protection Officer via the email shown below.

            </span>
          </div>

          <div className={cx("chapter")}>
            <h2 className={cx("title")}>
              11. Kid’s Privacy
            </h2>
            <span className={cx("description")}>
              We collect information from children under the age of 13 to make our Services better. If you are a parent or guardian and you know that your child has provided us with your Personal Data without your consent, please contact us. If we become aware that we have collected Personal Data from anyone under the age of 13 without parental consent verification, we will take steps to remove that information from our servers as soon as possible. If you think we may have any information about or from a child under the Minimum Age, please contact us via the email shown below.
            </span>
          </div>

          <div className={cx("chapter")}>
            <h2 className={cx("title")}>
              12. Contact Us
            </h2>
            <span className={cx("description")}>
              If you have any questions, please don't hesitate to contact us:
            </span>
            <ul>
              <li>Email: mekimtan@gmail.com</li>
              <li>Website: <a href="https://watchmegrow.online/">https://watchmegrow.online/ </a></li>
            </ul>
          </div>

        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
