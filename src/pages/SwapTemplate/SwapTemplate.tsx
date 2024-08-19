import styles from "./SwapTemplate.module.scss";
import classNames from "classnames/bind";
import TemplateCard from "./TemplateCard";
import { useEffect, useState } from "react";
import { videoTemplate } from "../../services/image";
import ReactPaginate from "react-paginate";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
const cx = classNames.bind(styles);


function SwapTemplate() {
  const [numPage, setNumPage] = useState(0);
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState();

  const [maxPage, setMaxPage] = useState(0);

  const param = useParams();
  const type = param?.type || "";
  const currentPage = param.page;

  const navi = useNavigate();

  const handleChangePage = (selected: number) => {
    navi(`/template/${type}/${selected+1}`);
  };
  useEffect(() => {
    async function fectchData() {
      if (type === "tm") {
        const res = await axios.get(
          `https://api.funface.online/get/list_video/time_machine_temp?page=${currentPage}`
        );
        setData(res.data.data);
        setNumPage(res.data.total_page);
      } else if (type === "d&m") {
        const res = await axios.get(
          `https://api.funface.online/get/list_video/all_video_baby_mom?page=${currentPage}`
        );
        setData(res.data.data);
        setNumPage(res.data.total_page);

      } else if (type === "k&m") {
        const res = await axios.get(
          `https://api.funface.online/list_image/mom_baby_temp?page=${currentPage}`
        );
        setData(res.data.data);;
        setNumPage(res.data.total_page);

      }
    }

    fectchData();
  }, [currentPage]);
  // useEffect(() => {
  //   async function setFirstPage() {
  //     setPageData(data.slice(0, 10));
  //     setMaxPage(Math.ceil(data.length / 10));
  //   }
  //   setFirstPage();
  // }, [data]);
  // console.log(data.length);
  console.log(data);
  return (
    <div className={cx("back")}>
      <Header />
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <span>Choose Your Template</span>
        </div>
        <div className={cx("main")}>
          {data &&
            data.map((item, index) => {
              // console.log(item?.image);
              return (
                <TemplateCard key={index} type={type} data={item} />
              )
            })}
        </div>
        <div>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(selected) => handleChangePage(selected.selected)}
            pageRangeDisplayed={4}
            pageCount={numPage}
            previousLabel="<"
            renderOnZeroPageCount={null}
            pageClassName={cx("page")}
            breakClassName={cx("page")}
            className={cx("paginate")}
            nextClassName={cx("page_but")}
            previousClassName={cx("page_but")}
            initialPage={0}
            activeClassName={cx("active")}
          />
        </div>
      </div>
    </div>
  );
}

export default SwapTemplate;
