import { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Reservation from './Reservation';
import '../css/ReservationCheck.css';
import list from '../img/목록.jpg';
import reservationImg from '../img/펜션1.jpg';
function ReservationCheck() {
//  const [user,setUser] = useState([]);
  const [reservation,setReservation] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  
   useEffect(() => {
    // 세션에 저장된 사용자 이름을 불러오기 위해 서버에 요청 (이메일 로그인)
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:8282/userdata', {
          withCredentials: true,
        });
        setUserInfo(res.data);
        setEditedUserInfo(res.data);
        console.log(res.data);
      } catch (err) {
        console.error('로그인 정보를 불러오지 못했습니다', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchReservationData = async () => {
      try{
        const res = await axios.get('http://localhost:8282/reservation/list',{
          withCredentials:true,
        });
        setReservation(res.data)
        console.log(res.data)
      }catch (err){
        console.error('예약 정보를 불러오지 못했습니다',err)
      }
    };
    fetchReservationData();
  },[])

  return (
    <div>
      <Header />
    <div className='reservationCheckDiv'>
      <div className='reservationCheckTitle'>
        <h1>예약 내역</h1>
      </div>
      <div>
        <div className='reservationDiv1'> 
          <img src={list} className='listImg' alt='목록'></img><span> 예약 목록</span>
         
        </div>
        <section className='reservationCheckSection'>
            <span>이메일 : {userInfo?.userEmail}</span><br /> 
            <span>닉네임 : {userInfo.nickname}</span><br />
            <span>펜션 이름 : </span>
            <img src={reservationImg} className="reservationImg" alt="펜션"></img>
        </section>
        <br />
        <section className='reservationCheckSection'>
            <span>이메일 : {userInfo.userEmail}</span><br /> 
            <span>닉네임 : {userInfo.nickname}</span><br />
            <span>펜션 이름 : </span>
            <img src={reservationImg} className="reservationImg" alt="펜션"></img>
        </section>
        <br />
        


      </div>
    </div>
    </div>
  );
}
export default ReservationCheck;
