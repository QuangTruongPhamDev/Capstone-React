import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateInfo from "./UpdateInfo";
import BookingHistory from "./BookingHistory";
import "./index.css"; // Import CSS styles

export default function Profile() {
  const [activeTab, setActiveTab] = useState("updateInfo"); // Tab hiện tại

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  console.log("Active Tab: ", activeTab);
  // Log giá trị activeTab để kiểm tra
  return (
    <div className="profile-container bg-black/30">
      <div className="container tabs">
        <button
          onClick={() => handleTabChange("updateInfo")}
          className={`tab-button ${activeTab === "updateInfo" ? "active" : ""}`}
        >
          Cập nhật thông tin
        </button>
        <button
          onClick={() => handleTabChange("bookingHistory")}
          className={`tab-button ${
            activeTab === "bookingHistory" ? "active" : ""
          }`}
        >
          Lịch sử đặt vé
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "updateInfo" ? <UpdateInfo /> : <BookingHistory />}
      </div>
    </div>
  );
}
