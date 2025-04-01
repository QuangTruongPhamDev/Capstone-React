import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomDetailService } from "../../api/cinemaService";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomDetail } from "../../redux/bookingSlice";
import SeatSelection from "./SeatSelection";
import BookingSummary from "./BookingSummary";

export default function BookingTicketsPage() {
  const { maLichChieu } = useParams();
  console.log("🛠 MaLichChieu:", maLichChieu);
  const dispatch = useDispatch();
  const { roomData, loading, error } = useSelector(
    (state) => state.bookingSlice
  );

  useEffect(() => {
    dispatch(fetchRoomDetail(maLichChieu)); // Gọi API qua Redux
  }, [dispatch, maLichChieu]);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center pt-20"
      style={{ backgroundImage: "url('/images/background_booking.jpg')" }} // Cập nhật đường dẫn ảnh
    >
      <div className="relative flex p-6 w-4/5 space-x-6 mt-12">
        {roomData ? (
          <>
            <div className="w-3/4 p-4 bg-white shadow-lg rounded-lg">
              <SeatSelection seats={roomData.danhSachGhe} />
            </div>
            <div className="w-1/4 p-4 bg-white shadow-lg rounded-lg">
              <BookingSummary roomData={roomData} />
            </div>
          </>
        ) : (
          <p className="text-white text-xl">Loading...</p>
        )}
      </div>
    </div>
  );
}
