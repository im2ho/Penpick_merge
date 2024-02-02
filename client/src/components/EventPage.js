import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../css/EventPage.css';
import Calendar from '../img/달력.png';
import UserImg from '../img/사용자.png';
import axios from 'axios';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';

function EventPage() {
  const [contentList, setContentList] = useState({ comment: '', content: '' });
  const [saveList, setSaveList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMovePage = (title) => {
    const content = title;
    window.location.href = `EventDetail?content=${content}`;
  };

  useEffect(() => {
    handleEventList();
  }, []);

  const handleEventList = async () => {
    try {
      const response = await axios.get(`http://localhost:8282/event/eventList`);

      setSaveList(response.data);
    } catch (error) {
      console.error('글을 찾을 수가 없어요 ' + error);
    }
  };

  return (
    <div>
      <Header />
      <div id='container'>
        <div id='eventContainer'>
          <div id='EventCategory'>
            <a href='EventPage'>이벤트</a>
            <br></br>
            <a href='Gameland'>게임랜드</a>
          </div>
          <div id='EventMain'>
            <h5>이벤트</h5>

            <h6 id='EventContent' href='/'>
              매일매일 선물이 쏟아진다! 펜픽이벤트에서 만나요 !
            </h6>

            <div>
              {saveList.map((contents, index) => (
                <div key={index}>
                  {contents.content_id !== null && (
                    <>
                      <button
                        id='eventButton'
                        onClick={() => handleMovePage(contents.content)}
                      >
                        {contents.content}
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
