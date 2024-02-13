import React, { useState } from 'react';
import axios from 'axios';

const WriteAnswer = ({ questionId }) => {
    const [answerContent, setAnswerContent] = useState('');

    const handleSubmit = async () => {
        const answerData = {
            questionId,
            answerContent,
            writtenDate: new Date().toISOString(), // 현재 날짜를 ISO 포맷으로 설정
        };
        
        try {
            // 서버에 답변 데이터 전송 (서버 주소 및 엔드포인트는 예시입니다)
            await axios.post('http://localhost:8282/QnA/submitAnswer', answerData, {
                withCredentials: true,
            });
            alert('답변이 저장되었습니다.');
            setAnswerContent(''); // 입력 필드 초기화
        } catch (err) {
            console.error('Error submitting answer: ', err);
            alert('답변 저장에 실패했습니다.');
        }
    };

    return (
        <div>
            <textarea
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="답변을 작성해주세요."
            ></textarea>
            <button onClick={handleSubmit}>저장</button>
        </div>
    );
};

export default WriteAnswer;
