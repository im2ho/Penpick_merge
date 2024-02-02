import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/PasswordModal.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PasswordModal = ({ isOpen, onClose }) => {

  //현재 비밀번호 
  const [currentPassword, setCurrentPassword] = useState('');

  // 새로운 비밀번호
  const [newPassword, setNewPassword] = useState('');

  // 새로운 비밀번호 확인
  const [confirmNewPassword, setConfirmNewPassword] = useState('');


  //로그인한 사용자 비밀번호
  //로그인한 사용자 정보 받아오기
  useEffect(() => {
    // 세션에 저장된 사용자 이름을 불러오기 위해 서버에 요청 (이메일 로그인)
    const fetchUserData = async () => {
        try {
            const res = await axios.get('http://localhost:8282/userdata',{
                withCredentials: true
            });
            console.log(res.data);
        } catch (err) {
            console.error('로그인 정보를 불러오지 못했습니다', err);
        }
    };
    fetchUserData();
    }, []);

  const handleChangePassword = async () => {
    try {
      const response = await axios.put('http://localhost:8282/api/user/changePassword', {
        currentPassword,
        newPassword,
      }, {
        withCredentials: true,
      });

      alert("비밀번호가 성공적으로 변경되었습니다");
    } catch (error) {
      console.error('비밀번호 변경 실패', error);
      alert("비밀번호 변경에 실패했습니다");
    }
  };

  return (
    <div className={`password-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span><br />
        <h2 style={{textAlign:"center"}}>비밀번호 재설정</h2><br />

        <label id="current-password-info">현재 비밀번호</label>
        <input
          type="password"
          name="currentPassword"
          id="current-password-input"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        /><br />

        <label id="new-password-info">새 비밀번호</label>
        <input
          type="password"
          name="newPassword"
          id="new-password-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        /><br />

        <label id="confirm-new-password-info">새 비밀번호 확인</label>
        <input
          type="password"
          name="confirmNewPassword"
          id="confirm-new-password-input"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        /><br /><br />

        <button id="changePassword-button" onClick={handleChangePassword}>비밀번호 변경</button>
      </div>
    </div>
  );
};

export default PasswordModal;
