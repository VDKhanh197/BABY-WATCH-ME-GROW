import styles from "./SwapTemplate.module.scss";
import classNames from "classnames/bind";
import TemplateCard from "./TemplateCard";
import { useEffect, useState } from "react";
import { videoTemplate } from "../../services/image";
import ReactPaginate from "react-paginate";
import Header from "../../components/Header";
import axios from "axios";
import { useParams } from "react-router";
const cx = classNames.bind(styles);

function SwapTemplate() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);

  const [maxPage, setMaxPage] = useState(0);

  const param = useParams();
  const type = param?.type||"";

  const handleChangePage = (selected: number) => {
    if (selected + 1 === maxPage) {
      setPageData(data.slice((selected + 1) * 10 - 10, data.length));
    } else {
      setPageData(data.slice((selected + 1) * 10 - 10, (selected + 1) * 10));
    }
    setPage(selected);
  };
  useEffect(() => {
    async function fectchData() {
      const res = await axios.get('https://api.watchmegrow.online/get/list_video/time_machine_temp');
      setData(res.data.list_sukien_video);
    }

    fectchData();
  }, []);
  useEffect(() => {
    async function setFirstPage() {
      setPageData(data.slice(0, 10));
      setMaxPage(Math.ceil(data.length / 10));
    }
    setFirstPage();
  }, [data]);
  console.log(data.length);

  return (
    <div className={cx("back")}>
      <Header />
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <span>Choose Your Template</span>
        </div>
        <div className={cx("main")}>
          {pageData.length > 0 &&
            pageData.map((item, index) => (
              <TemplateCard key={index} index={index} type={type} data={item} />
            ))}
        </div>
        <div>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(selected) => handleChangePage(selected.selected)}
            pageRangeDisplayed={4}
            pageCount={maxPage}
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
