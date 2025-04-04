import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSelection, saveTicket } from "../../redux/bookingSlice";
import { bookedTicketService } from "../../api/bookingService";
import { fetchRoomData } from "../../redux/bookingThunk";
import { fetchBookingHistory } from "../../redux/userSlice";

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

  // Kiểm tra trạng thái đăng nhập
  const user = useSelector((state) => state.userSlice.user); // Người dùng lưu trong redux

  // Trạng thái thông báo
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hàm xử lý thanh toán
  const handlePayment = async () => {
    if (!user) {
      setPaymentError("Vui lòng đăng nhập để thanh toán.");
      return;
    }

    if (selectedSeats.length === 0) {
      setPaymentError("Bạn chưa chọn ghế.");
      return;
    }

    setLoading(true);
    setPaymentError(null);

    const bookingData = {
      maLichChieu: roomData.thongTinPhim.maLichChieu,
      danhSachVe: selectedSeats.map((seat) => ({
        maGhe: seat.maGhe,
        giaVe: seat.giaVe,
      })),
    };

    try {
      await bookedTicketService(bookingData);

      // Gọi API để cập nhật lại danh sách ghế đã đặt
      dispatch(fetchRoomData(roomData?.thongTinPhim?.maLichChieu));

      // Gọi lại lịch sử đặt vé để cập nhật Redux
      dispatch(fetchBookingHistory());

      setPaymentSuccess(true);
      dispatch(resetSelection());
    } catch (error) {
      setPaymentError("Thanh toán thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Thông tin đặt vé</h2>

      {roomData && (
        <>
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
          <ul className="list-disc pl-6">
            {selectedSeats.map((seat) => (
              <li key={seat.maGhe}>
                Ghế {seat.tenGhe} - {seat.giaVe.toLocaleString()}đ
              </li>
            ))}
          </ul>

          <p className="mt-4 text-lg font-bold">
            Tổng tiền: {totalPrice.toLocaleString()}đ
          </p>

          {paymentError && <p className="text-red-500 mt-4">{paymentError}</p>}
          {paymentSuccess && (
            <p className="text-green-500 mt-4">Đặt vé thành công!</p>
          )}

          {/* Responsive Button Section */}
          <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4">
            <button
              className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded mb-4 sm:mb-0"
              onClick={() => dispatch(resetSelection())}
            >
              Đặt lại
            </button>
            <button
              className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Thanh toán"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
