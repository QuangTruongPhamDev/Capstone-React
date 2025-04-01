import React, { useState } from "react";
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

  // Kiểm tra trạng thái đăng nhập
  const user = useSelector((state) => state.userSlice.user); // Giả sử người dùng lưu trong redux

  // Trạng thái thông báo
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Hàm xử lý thanh toán
  const handlePayment = () => {
    if (!user) {
      // Nếu chưa đăng nhập
      setPaymentError("Vui lòng đăng nhập để thực hiện thanh toán.");
      setPaymentSuccess(false);
    } else {
      // Nếu đã đăng nhập
      setPaymentSuccess(true);
      setPaymentError(null);
    }
  };
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
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

          {/* Thông báo lỗi nếu chưa đăng nhập */}
          {paymentError && <p className="text-red-500 mt-4">{paymentError}</p>}

          {/* Thông báo thành công nếu đã thanh toán */}
          {paymentSuccess && !paymentError && (
            <p className="text-green-500 mt-4">
              Đặt vé thành công! Cảm ơn bạn đã đặt vé.
            </p>
          )}

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
            >
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
