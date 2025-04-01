import React, { useEffect, useState } from "react";
import { getListBannerService } from "../../api/movieService";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
export default function ListBanner() {
  let [listBanner, setBanner] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getListBannerService()
      .then((res) => {
        console.log("res: ", res.data.content);
        setBanner(res.data.content);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  // Chuyển slide tự động mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === listBanner.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5000ms = 5 giây

    return () => clearInterval(interval); // Cleanup khi component bị unmount
  }, [currentIndex, listBanner.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === listBanner.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? listBanner.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-lg background bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/images/banner_background.jpg')` }}
    >
      {listBanner.map((banner, index) => (
        <div
          key={banner.maBanner}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={banner.hinhAnh}
            alt={banner.maBanner}
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>
      ))}

      {/* Arrow Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-40 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full text-3xl"
      >
        <LeftOutlined />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-40 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full text-3xl"
      >
        <RightOutlined />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {listBanner.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
