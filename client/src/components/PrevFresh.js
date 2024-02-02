import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../css/prevFresh.css";
export default function PrevFresh() {
  const navigate = useNavigate();

  //사용자 불러오기
  const [, setUser] = useState([]);

  const [reservation, setReservation] = useState([]);

  //버튼 클릭시 예약 정보를 담고 이동
  console.log("1", reservation);
  const move = (resId) => {
    console.log(resId);

    navigate("/FreshHome", {
      state: {
        id: resId,
      },
    });
  };

  //로그인한 사용자 정보 받아오기
  useEffect(() => {
    // 세션에 저장된 사용자 이름을 불러오기 위해 서버에 요청 (이메일 로그인)
    const fetchUserCartData = async () => {
      try {
        const res = await axios.get("http://localhost:8282/userdata", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("세션 데이터 불러오기 실패", err);
      }
    };
    fetchUserCartData();
  }, []);

  //예약 불러오기
  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        //const getReservation = await axios.get(
        //  "http://localhost:8282/freshorder/user_num"
        //);
        const tmpData = [
          {
            id: 1,
            market: "사용",
            pay: 30000,
            pay_date: "2024/01/30",
            payment: "카드",
            people: "3명",
            pick: "이용",
            pick_time: "19:30",
            quantity: "3",
            res_date: "2024/01/13",
            room_type: "트윈",
            user_num: 1,
            penpick_user_id: "11",
            pensions_id: "1",
          },
          {
            id: 2,
            market: "사용",
            pay: 30000,
            pay_date: "2024/01/30",
            payment: "카드",
            people: "3명",
            pick: "이용",
            pick_time: "19:30",
            quantity: "3",
            res_date: "2024/03/13",
            room_type: "트윈",
            user_num: 1,
            penpick_user_id: "12",
            pensions_id: "1",
          },
          {
            id: 3,
            market: "사용",
            pay: 30000,
            pay_date: "2024/01/30",
            payment: "카드",
            people: "3명",
            pick: "이용",
            pick_time: "19:30",
            quantity: "3",
            res_date: "2024/02/13",
            room_type: "트윈",
            user_num: 1,
            penpick_user_id: "13",
            pensions_id: "1",
          },
        ];
        setReservation(tmpData);
        //setReservation(getReservation.data);
        //console.log(getReservation.data);
      } catch (error) {
        console.log("예약을 불러오지 못했습니다.", error);
      }
    };
    fetchReservationData();
  }, []);

  return (
    <div>
      <div className="logo__container">
        <Header />
      </div>
      <div className="fresh_res_list">
        <h1>주문하실 예약 장소를 선택해주세요</h1>
        <ul className="reservation__container">
          {reservation.map((reservation) => (
            <li key={reservation.id} className="reservation">
              <button onClick={() => move(reservation.id)}>
                날짜 : {reservation.res_date}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
