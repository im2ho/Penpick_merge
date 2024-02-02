import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

function EventDetail() {
  const [contentList, setContentList] = useState({
    comments: '',
    content: '',
    content_id: '',
    commentdate: '',
  });
  const [saveList, setSaveList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const year = now.getFullYear();
  var month = ('0' + (now.getMonth() + 1)).slice(-2);
  var day = ('0' + now.getDate()).slice(-2);
  const commentdate =
    year + '.' + month + '.' + day + '.' + hours + '.' + minutes;

  const searchContent = urlParams.get('content');

  useEffect(() => {
    setSearchTerm(searchContent);
    console.log(searchContent);
  }, [searchContent]);

  useEffect(() => {
    if (searchTerm !== '') {
      handleEventList();
    }
  }, [searchTerm]);

  const handleAddEvent = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8282/event/addEvent`,
        contentList
      );
      console.log(contentList);
      setContentList({ comments: '' });
      window.location.href(`EventDetail?content=${searchTerm}`);
    } catch (error) {
      console.error('글 등록이 안됐어 ' + error);
    }
  };

  const handleEventList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8282/event/eventDetailList`,
        { params: { contents: searchTerm } }
      );
      setSaveList(response.data);
    } catch (error) {
      console.error('글을 찾을 수가 없어요 ' + error);
    }
  };

  return (
    <div>
      <Header />
      <div id='Detailcontainer'>
        <div id='detailContent'>{searchTerm}</div>
      </div>
      <form id='eventform' className='row'>
        <input
          className='form-control col-md-9'
          id='eventComments'
          type='text'
          value={contentList.comments}
          placeholder='댓글을 입력해주세요'
          onChange={(e) =>
            setContentList({
              comments: e.target.value,
              content: searchTerm,
              content_id: null,
              commentdate: commentdate,
            })
          }
        ></input>
        <button
          className='btn btn-primary col-md-3'
          type='submit'
          id='eventFormButton'
          onClick={handleAddEvent}
        >
          작성하기
        </button>
        {saveList.map((list, index) => (
          <div key={index}>
            <hr />
            {list.comments}
            <span id='eventCommentDate'>{list.commentdate}</span>
          </div>
        ))}
      </form>
    </div>
  );
}
export default EventDetail;
