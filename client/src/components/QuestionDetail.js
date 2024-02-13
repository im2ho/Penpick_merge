import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import AnswerToQuestion from './AnswerContent';

export default function QuestionDetail() {
    const { questionId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`http://localhost:8282/QnA/questionDetail/${questionId}`, {
                    withCredentials: true,
                });
                setPost(response.data);
            } catch (err) {
                console.error("Error fetching post data: ", err);
            }
        };
        fetchPostData();
    }, [questionId]);

    // 날짜 포맷 함수
    const formatDate = (dateString) => {
        if (!dateString) return ''; // 유효하지 않은 날짜 문자열 처리
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\. /g, '-').replace('.', '');
    };

    return (
        <div>
            <Header />
            <div id="QnA-header">
                <h4>{post?.questionTitle}</h4>
                <p>{post?.nickname}</p>
                <p>{formatDate(post?.writtenDate)}</p>
                <p>{post?.questionContent}</p>
            </div>
            <AnswerToQuestion questionId={questionId} />
        </div>
    );
}
