import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/order.css";
import Header from "./Header";

export default function FinishOrder() {
  //결제내역
  const [finishOrder, setFinishOrder] = useState([
    {
      id: 0,
      item_num: 0,
      item_name: "상추",
      item_price: 10000,
      item_count: 2,
      fresh_cartitem_num: 0,
    },
    {
      id: 1,
      item_num: 1,
      item_name: "삼겹살",
      item_price: 35000,
      item_count: 6,
      fresh_cartitem_num: 1,
    },
  ]);
  const [total, setTotal] = useState(0);

  //결제내역 불러오기
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const regOrder = await axios.get(
          "http://localhost:8282/freshOrder/user_num"
        );
        setFinishOrder(regOrder.data);
        console.log(regOrder.data);
      } catch (error) {
        console.log("카트를 불러오지 못했습니다.", error);
      }
    };
    // fetchOrderData();
  }, []);

  useEffect(() => {
    let t = 0;

    finishOrder.forEach(({ item_price, item_count }) => {
      t += item_price * item_count;
    });

    setTotal(t);
  }, []);

  return (
    <div>
      <div className="logo__container">
        <Header />
      </div>
      <div className="fresh_order">
        <div className="order__list__container">
          <h1>결제 내역</h1>
          <h4 className="reservation__number">예약 번호 : 135489156</h4>

          <ul className="order__list">
            {finishOrder.map((finish, idx) => (
              <li key={idx} className="order__item">
                <p>{finish.item_name}</p>
                <p>{finish.item_count}개</p>
                <p>{finish.item_price}원</p>
                <p>{finish.item_count * finish.item_price}원</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="divider" />
        <div className="order__footer">
          <div />
          <div>
            <p className="total">총 가격 : {total}원</p>
          </div>
        </div>
      </div>
    </div>
  );
}
