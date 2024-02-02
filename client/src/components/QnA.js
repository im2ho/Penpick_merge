import Header from "./Header";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import axios from "axios";

import "../css/questionlist.css";
import "../css/page.css";

function QnA() {
  const [questionList, setQuestionList] = useState([]);

  // 검색용 Hook
  const [choiceVal, setChoiceVal] = useState("");
  const [searchVal, setSearchVal] = useState("");

  // Paging
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  // 게시글 전체 조회
  const getQuestionList = async (page) => {
    try {
      const response = await axios.get("http://localhost:8282/question/list", {
        params: { page: page - 1 },
      });

      console.log("[QnA.js] useEffect() success");
      console.log(response.data);

      setQuestionList(response.data.content);
      setPageSize(response.data.pageSize);
      setTotalPages(response.data.totalPages);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.log("[QnA.js] useEffect() error");
      console.log(error);
    }
  };

  // 게시글 검색
  const search = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8282/question/search",
        {
          params: {
            page: page - 1,
            title: choiceVal === "title" ? searchVal : "",
            content: choiceVal === "content" ? searchVal : "",
            writerName: choiceVal === "writer" ? searchVal : "",
          },
        }
      );

      console.log("[QnA.js searchBtn()] success");
      console.log(response.data);

      setQuestionList(response.data.content);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.log("[QnA.js searchBtn()] error");
      console.log(error);
    }
  };

  // 첫 로딩 시, 한 페이지만 가져옴
  useEffect(() => {
    getQuestionList(1);
  }, []);

  // 검색 조건 저장
  const changeChoice = (event) => {
    setChoiceVal(event.target.value);
  };
  const changeSearch = (event) => {
    setSearchVal(event.target.value);
  };

  // 페이징 보여주기
  const changePage = (page) => {
    setPage(page);
    getQuestionList(page);
  };

  return (
    <div>
      <Header />
      {/* 검색 */}
      <table className="search">
        <tbody>
          <tr>
            <td>
              <select
                className="custom-select"
                value={choiceVal}
                onChange={changeChoice}
              >
                <option>검색 옵션 선택</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="writer">작성자</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="검색어"
                value={searchVal}
                onChange={changeSearch}
              />
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={search}
              >
                <i className="fas fa-search"></i> 검색
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-1">번호</th>
            <th className="col-7">제목</th>
            <th className="col-3">작성자</th>
            <th className="col-1">조회수</th>
          </tr>
        </thead>

        <tbody>
          {questionList.map(function (question, idx) {
            return <TableRow obj={question} key={idx} cnt={idx + 1} />;
          })}
        </tbody>
      </table>

      <Pagination
        className="pagination"
        activePage={page}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={totalPages}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={changePage}
      />

      <div className="my-5 d-flex justify-content-center">
        <Link className="btn btn-outline-secondary" to="/question/write">
          <i className="fas fa-pen"></i> &nbsp; 글쓰기
        </Link>
      </div>
    </div>
  );
}

/* 글 목록 테이블 행 컴포넌트 */
function TableRow(props) {
  const question = props.obj;

  return (
    <tr>
      <th>{props.cnt}</th>
      <td>
        <Link to={{ pathname: `/question/${question.questionNum}` }}>
          <span className="underline bbs-title">{question.title}</span>
        </Link>
      </td>
      <td>{question.writerNickname}</td>
      <td style={{ textAlign: "center" }}>{question.viewCount}</td>
    </tr>
  );
}

export default QnA;
