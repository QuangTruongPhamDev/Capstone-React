import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSeat } from "../../redux/bookingSlice";

export default function SeatSelection() {
  const dispatch = useDispatch();
  const seats = useSelector(
    (state) => state.bookingSlice.roomData?.danhSachGhe
  );
  const selectedSeats = useSelector(
    (state) => state.bookingSlice.selectedSeats
  );
  // Hàm chọn ghế
  const handleSelectSeat = (seat) => {
    if (!seat.daDat) {
      dispatch(selectSeat(seat));
    }
  };
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-full bg-gray-800 text-white text-center py-3 rounded-md text-lg mb-6">
        MÀN HÌNH
      </div>

      {/* Grid for seat buttons */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 gap-3">
        {seats?.map((seat) => (
          <button
            key={seat.maGhe}
            onClick={() => handleSelectSeat(seat)}
            disabled={seat.daDat}
            className={`w-10 h-10 flex items-center justify-center text-xs font-bold rounded-md border ${
              seat.daDat
                ? "bg-gray-500 cursor-not-allowed text-white"
                : selectedSeats.some((s) => s.maGhe === seat.maGhe)
                ? "bg-green-500 text-white"
                : seat.loaiGhe === "Vip"
                ? "bg-yellow-500 text-black"
                : "bg-blue-500 text-white"
            }`}
          >
            {seat.soGhe}
          </button>
        ))}
      </div>

      {/* Legend for seat types */}
      <div className="flex flex-wrap justify-center space-x-6 mt-6">
        <div className="flex items-center mb-2">
          <div className="w-5 h-5 bg-blue-500 rounded-md mr-2"></div>
          <span>Ghế Thường</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-5 h-5 bg-yellow-500 rounded-md mr-2"></div>
          <span>Ghế VIP</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-5 h-5 bg-green-500 rounded-md mr-2"></div>
          <span>Đang chọn</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-5 h-5 bg-gray-500 rounded-md mr-2"></div>
          <span>Ghế đã đặt</span>
        </div>
      </div>
    </div>
  );
}
