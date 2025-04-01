import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSelection } from "../../redux/bookingSlice";

export default function BookingSummary() {
  const dispatch = useDispatch();
  const roomData = useSelector((state) => state.bookingSlice.roomData);
  const selectedSeats = useSelector(
    (state) => state.bookingSlice.selectedSeats
  );
  const totalPrice = selectedSeats.reduce(
    (total, seat) => total + seat.giaVe,
    0
  );
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Thông tin đặt vé</h2>
      {roomData && (
        <div>
          <p>
            <strong>Rạp:</strong> {roomData.thongTinPhim.tenCumRap}
          </p>
          <p>
            <strong>Phim:</strong> {roomData.thongTinPhim.tenPhim}
          </p>
          <p>
            <strong>Suất chiếu:</strong> {roomData.thongTinPhim.gioChieu} -{" "}
            {roomData.thongTinPhim.ngayChieu}
          </p>
          <p className="mt-4">
            <strong>Ghế đã chọn:</strong>
          </p>
          <ul>
            {selectedSeats.map((seat) => (
              <li key={seat.maGhe}>
                Ghế {seat.tenGhe} - {seat.giaVe.toLocaleString()}đ
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg font-bold">
            Tổng tiền: {totalPrice.toLocaleString()}đ
          </p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => dispatch(resetSelection())}
          >
            Đặt lại
          </button>
        </div>
      )}
    </div>
  );
}
