import { Modal, CardImg, Container } from 'react-bootstrap';
import '../css/Reservation.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoverImage from '../img/펜션1.jpg';
import KakaoImage from '../img/kakao.png';
import backSpaceImage from '../img/뒤로가기.jpg';
import CardImage from '../img/체크카드.PNG';
import kakaoPay from '../img/kpay.png';
import naverPay from '../img/npay.jpg';
import kbPay from '../img/kbpay.png';
import paycoPay from '../img/payco.jpg';
import Header from './Header';

function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [pick,setPick] = useState('');
  const [email, setEmail] = useState('');

  const [phoneNumber,setPhoneNumber] = useState('');
  
  const [pensionName,setPensionName] = useState('');
  const [people,setPeople] = useState('');
  // const [pensionsId, setPensionsId] = useState('');
  // const [quantity, setQuantity] = useState('');
  const [purchases, setPurchases] = useState([]);
 
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleShow = () => setModalIsOpen(true);

  const handleClose = () => setModalIsOpen(false);

  const [detailPension, setDetailPension] = useState([]);
  
  const [userNum,setUserNum] = useState('');

  const urlParameter = new URLSearchParams(window.location.search);

  const selectedPension = urlParameter.get("id");

  const [testParam, setTestParam] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    const {value} = e.target;
    setReservations((prevReservations) => ({...prevReservations,pick:value}))
  };

  
  // const handlePick = () => setPick(true);
  //펜션 아이디 담는곳
  useEffect(() => {
    setTestParam(selectedPension);
  }, [testParam]);
 
  //펜션 아이디 데이터 가져오기
  useEffect(() => {
    if (selectedPension !== null) {
      handleDetail();
      console.log(selectedPension + "이건 selectedPension");
      console.log(testParam);
    } else {
      console.log("엥;");
    }
  }, [testParam]);

 const handleDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:8282/penpick/details`, {
        params: {
          id: testParam,
        },
      });
      console.log(res.data);
      setDetailPension(res.data);

      console.log(testParam);
    } catch (error) {
      console.log(error);
      setDetailPension([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8282/reservation/list'
        );
        setReservations(response.data);
      } catch (error) {
        console.log('데이터를 불러오지 못했습니다.', error);
      }
    };
    fetchData();
  }, []);

  const fetchReservations = () => {
    if (!email) {
      console.error('닉네임을 입력하세요.');
      return;
    }

    axios
      .get(`http://localhost:8282/userdata`)
      .then((response) => setPurchases(response.data))
      .catch((error) => console.error(error));
  };

  const makeReservation = () => {
    if (!email  || !phoneNumber || !people) {
      console.error(
        '이메일,전화번호,인원수를 입력하세요.'
      );
      return;
    }

    axios
      .post('http://localhost:8282/reservation/makeReservation', {
        email: email,
        phoneNumber:phoneNumber,
        people: people,
      })
      .then(() => {
        fetchReservations();
      })
      .catch((error) => console.error(error));

  };

  // 펜션 목록으로 돌아가기
  function comebackFunction() {
    window.location.href = '/pensionList';
  }

  // 고객 센터로 가기
  function serviceCenterFunction() {
    window.location.href = '/customerServiceCenterMain';
  }

  // 카카오톡 상담
  function kakaoQuestionFuction() {
    window.location.href = '/';
  }

  // 예약확인
  function reservationCheckFunction() {
    const handleReservationCheck = (userId) => {
      const selectedUser = userId;
      window.location.href = `/reservationCheck`;
    }
    window.location.href = '/reservationCheck';
  }

  // 결제확인
  function paySuccess() {
    alert('결제가 완료 되었습니다.');
  }

  return (
    <div>
      <Header />
      <div className='reservationDiv'>
        <div className='comebackDiv'>
        <button className='comebackButton' onClick={comebackFunction}>
          <img
            src={backSpaceImage}
            className='backSpaceImage'
            alt='돌아가기'
          ></img>
          돌아가기
        </button>
        </div>
      <br />
      <h1 id='reservationId'>예약 및 결제</h1>
      <section className='reservationSection1'>
        <label>펜션 이름 </label><br />
        <label>  {detailPension.name}</label><br />
        <label>이메일 </label>
        <br />
        <input
          type='text'
          placeholder='kh@co.kr'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>{' '}
        <br />
        <label>전화번호 </label>
        <br />
        <input
          type='text'
          placeholder='010-1234-5678 -빼고 입력'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>{' '}
        <br/>
        <label>인원 수 </label>
        <br />
        <input
          type='number'
          placeholder='1'
          max="4"
          min="1"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        ></input>{' '}
        <br />
        {/* <label>
        <input
          type="radio"
          value="Y"
          checked={reservations.pick === "Y"}
          onChange={handleCheckboxChange}
        />
        픽업o
      </label>
      <label>
        <input
          type="radio"
          value="N"
          checked={reservations.pick === "N"}
          onChange={handleCheckboxChange}
        />
        픽업x
      </label> */}
        {/* <input type='checkBox' 
        value={pick}
         onClick={handlePick}
        ></input> */}
        {/* onchange((e) => setModalIsOpen(e.target.value)) */}
        {/* 예약 조회하러 가기 */}
        {/* <button type="submit" id="checkButton" onClick={reservationCheckFunction}>예약 확인</button> */}
      </section>
      <section className='reservationSection2'>
        <div className='reservationCoverImage'>
          <img src={CoverImage} className='CoverImage' alt='커버이미지'></img>
        </div>
        <br />

        {/* <ul>
                    {reservations.map((reservation) => (
                        <li key={reservation.id}>
                            <p>예약 금액 : {reservation.pay}원</p>
                            <p>결제 일 : {reservation.payDate}</p>
                        </li>
                    ))}
                </ul>
                */}
      </section>

      <section className='reservationSection3'>
        <h1 className="selectPayment">결제 수단</h1>
        <br />
        <br />
        <div className='checkBox'>
          <input type='checkbox'></input>{' '}
          <span>이 결제수단을 다음에도 사용</span>
          <br />
        </div>

        <Modal
          className='Modal'
          show={modalIsOpen}
          onHide={handleClose}
        >
          <div className='modalDiv'>
            <span>
              결제하기
              <img src={CardImage} id='cardImage' alt='카드이미지'></img>
            </span>
            <br />
            <span>펜션 이름 : {detailPension.name}</span><br /> 
            
           
            <button id='modalButton' type='submit' onClick={makeReservation}>
              결제하기
            </button>
          </div>
        </Modal>

      
        <div className='buttonBox'>
          <button id='payButton' onClick={handleShow}>
            신용카드
          </button>
          
          <button id='payButton' onClick={handleShow}>
            휴대폰 결제
          </button>
          <button id='payButton' onClick={handleShow}>
            <img src={kakaoPay} id='kakaoPay' alt='카카오페이'></img>
          </button>
          <button id='payButton' onClick={handleShow}>
            <img src={naverPay} id='naverPay' alt='네이버 페이'></img>
          </button>{' '}
          <tr />
          <br />
          <button id='payButton' onClick={handleShow}>
            <img src={kbPay} id='kbPay' alt='kb 페이'></img>
          </button>
          <button id='payButton' onClick={handleShow}>
            <img src={paycoPay} id='paycoPay' alt='payco 페이'></img>
          </button>
        </div>
     
      </section>
      <section className='reservationSection4'>
        <button id='serviceCenterButton' onClick={serviceCenterFunction}>
          고객센터
        </button>
        <br />
        <button id='kakaoQuestionButton' onClick={kakaoQuestionFuction}>
          <img src={KakaoImage} id='kakaoQuestion' alt='카카오 상담'></img>
          카카오톡 상담
        </button>
      </section>
      </div>
    </div>
  );
}

export default Reservation;
