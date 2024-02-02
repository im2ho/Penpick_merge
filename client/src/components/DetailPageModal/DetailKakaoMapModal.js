import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../../css/DetailsPage.css";

function DetailKakaoMapModal() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedId = urlParams.get("id");
  const [searchDetail, setSearchDetail] = useState("");
  const [detailPension, setDetailPension] = useState([]);

  // 지도 보여주는 모달

  useEffect(() => {
    setSearchDetail(selectedId);
    if (selectedId !== null) {
      handleDetail();
      console.log("카카오 모달 성공");
    } else {
      console.log("검색값 없음");
    }
  }, [searchDetail]);

  const bloadKakaoMap = (pension) => {
    const bscript = document.createElement("script");
    bscript.async = true;
    bscript.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=bc0b0a476c690ff9dfdbc6a531ebf7b4&autoload=false";
    document.head.appendChild(bscript);

    bscript.onload = () => {
      window.kakao.maps.load(() => {
        // 이 안에서는 window.kakao.maps가 올바로 로드된 상태입니다.
        const bcontainer = document.getElementById("modalmap");
        const boptions = {
          center: new window.kakao.maps.LatLng(
            pension.latitude,
            pension.longitude
          ),
          level: 3,
        };

        const bmap = new window.kakao.maps.Map(bcontainer, boptions);

        var bmapTypeControl = new window.kakao.maps.MapTypeControl();

        bmap.addControl(
          bmapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT
        );

        const bmarker = new window.kakao.maps.Marker({
          map: bmap,
          position: new window.kakao.maps.LatLng(
            pension.latitude,
            pension.longitude
          ),
          title: pension.name,
        });
      });
    };
  };

  const handleDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:8282/penpick/details`, {
        params: {
          id: searchDetail,
        },
      });
      // console.log(res.data);
      setDetailPension(res.data);
      bloadKakaoMap(res.data);
      console.log(bloadKakaoMap);
      // console.log(detailPension);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return <div></div>;
}

export default DetailKakaoMapModal;
