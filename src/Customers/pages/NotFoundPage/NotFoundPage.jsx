import Lottie from "lottie-react";
import React from "react";
import notFoundAnimation from "../../../assets/404notfound-animation.json";
import "./index.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/images/background_app.jpg')` }} // Đổi ảnh nền ở đây
    >
      {/* Lớp phủ trong suốt */}
      <div className="absolute-cover">
        {/* Animation Lottie */}
        <div className="w-150 h-150">
          <Lottie animationData={notFoundAnimation} loop={true} />
        </div>

        {/* Text có hiệu ứng WAVE */}
        <div className="wave-container mt-5">
          <h1 className="wave-text">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>

        {/* Mô tả lỗi */}
        <p className="text-gray-300 text-lg mt-2">
          Oops! Trang bạn đang tìm kiếm không tồn tại.
        </p>

        {/* Nút quay lại trang chủ sử dụng Link của Ant Design */}
        <Link
          to="/"
          className="ant-btn mt-6" // Sử dụng class ant-btn từ Ant Design
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
