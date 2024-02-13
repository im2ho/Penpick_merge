import React, { useEffect, useState } from "react";
import axios from "axios"; // axios를 import합니다.
import Header from "./Header";
import '../css/WriteQuestion.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WriteQuestion() {
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8282/userdata", {
          withCredentials: true,
        });
        setNickname(res.data.nickname);
      } catch (err) {
        console.error("세션 데이터 불러오기 실패", err);
      }
    };
    fetchUserData();
  }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
//     try {
//       const res = await axios.post("http://localhost:8282/QnA/write-question", {
//         nickname: nickname, 
//         questionTitle: title, 
//         questionContent: content, 
//         writtenDate: new Date(), 
//       });
//       console.log(res.data);
//       alert("문의글이 등록되었습니다.");
//       window.location.href="/QnA";
//     } catch (err) {
//       console.error("문의글 등록 실패", err);
//       alert("문의글 등록에 실패했습니다.");
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
  
    try {

      const res = await axios.post("http://localhost:8282/QnA/write-question", {
        nickname: nickname,
        questionTitle: title,
        questionContent: content,
        writtenDate: new Date(), 
      });
      console.log(res.data);
      alert("문의글이 등록되었습니다.");
      window.location.href="/QnA";
    } catch (err) {
      console.error("문의글 등록 실패", err);
      alert("문의글 등록에 실패했습니다.");
    }
  };

  return (
    <div>
      <Header />
      <div id="QnA-header">
        <h4>고객센터</h4>
        <p>어려움이나 궁금한 점이 있으신가요?</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  );
}
