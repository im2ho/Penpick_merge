import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WriteAnswer from './WriteAnswer';

const AnswerToQuestion = ({ questionId }) => {
    const [answer, setAnswer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState('');

    // 답변 작성 폼 표시 여부
    const [showWriteAnswerForm, setShowWriteAnswerForm] = useState(false);

    useEffect(() => {
        const fetchAnswer = async () => {
            try {
                const response = await axios.get(`http://localhost:8282/QnA/answers/${questionId}`, {
                    withCredentials: true,
                });
                setAnswer(response.data);
                setEditedContent(response.data ? response.data.answerContent : '');
            } catch (err) {
                console.error("Error fetching answer: ", err);
            }
        };

        fetchAnswer();
    }, [questionId]);

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = async () => {
        try {
                await axios.put(`http://localhost:8282/QnA/answers/${answer.answerId}`, {
                questionId: answer.questionId,
                answerContent: editedContent,
                writtenDate: new Date().toISOString() // 현재 시간으로 업데이트하거나 서버측에서 처리
                }, {
                withCredentials: true,
                });
            setAnswer({...answer, answerContent: editedContent});
            setEditMode(false);
            alert('답변이 수정되었습니다.');
        } catch (err) {
            console.error("Error saving edited answer: ", err);
            alert('답변 수정에 실패했습니다.');
        }
    };

    const toggleWriteAnswerForm = () => {
        setShowWriteAnswerForm(!showWriteAnswerForm);
    };

    if (!answer && !showWriteAnswerForm) {
        return (
            <div>
                <p>아직 답변이 작성되지 않았습니다.</p>
                <button onClick={toggleWriteAnswerForm}>답변 작성하기</button>
            </div>
        );
    }

    return (
        <div>
            {showWriteAnswerForm ? (
                <WriteAnswer questionId={questionId} />
            ) : editMode ? (
                <>
                    <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                    <button onClick={handleSave}>저장하기</button>
                </>
            ) : (
                <>
                    <p>{answer.answerContent}</p>
                    <p>{answer.writtenDate}</p>
                    <button onClick={handleEdit}>수정하기</button>
                </>
            )}
        </div>
    );
};

export default AnswerToQuestion;
