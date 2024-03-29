import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'; 
import Header from "./Header";
import '../css/questionlist.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function QnAList() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const response = await axios.get(`http://localhost:8282/QnA/questionList?page=${currentPage - 1}&size=10`, {
          withCredentials: true,
        });
        setPosts(response.data.content); // 페이지에 해당하는 게시글 데이터
        setTotalPages(response.data.totalPages); // 전체 페이지 수 설정
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };
    fetchPostsData();
  }, [currentPage]);

  // 페이지 번호 클릭 핸들러
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // 페이지네이션 버튼 렌더링
  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} onClick={() => handlePageClick(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <Header />
      <div id="QnA-header">
        <h4>고객센터</h4>
        <p>어려움이나 궁금한 점이 있으신가요?</p>
      </div>
      <div className="container mt-3">
        <table className="table" id="question-list-container">
          <thead className="thead-light">
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(posts) && posts.map((post) => (
              <tr key={post.questionId}>
                <td>{post.questionId}</td>
                <td>
                  <Link to={`/questionDetail/${post.questionId}`}>{post.questionTitle}</Link>
                </td>
                <td>{post.nickname}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {renderPagination()}
        </div>
      </div>
      <button className="button" onClick={() => window.location.href = "/writeQuestion"}>글 쓰기</button>
    </div>
  );
}
