import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingHistory } from "../../redux/userSlice";

export default function BookingHistory() {
  const dispatch = useDispatch();
  const bookingHistory = useSelector((state) => state.userSlice.bookingHistory); // Lịch sử đặt vé từ redux
  const loading = useSelector((state) => state.userSlice.loading); // Trạng thái loading từ redux
  const error = useSelector((state) => state.userSlice.error);
  const user = useSelector((state) => state.userSlice.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchBookingHistory());
    }
  }, [dispatch, user]);

  if (!user) {
    return <p>Vui lòng đăng nhập để xem lịch sử đặt vé.</p>;
  }

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    console.error("BookingHistory Error:", error);
    return <p>Có lỗi xảy ra: {error}</p>;
  }

  // Kiểm tra dữ liệu bookingHistory có hợp lệ
  if (!Array.isArray(bookingHistory) || bookingHistory.length === 0) {
    return <p>Chưa có lịch sử đặt vé.</p>;
  }

  return (
    <div className="container profile-history-container">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">Lịch sử đặt vé</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : bookingHistory.length === 0 ? (
        <p>Không có lịch sử đặt vé.</p>
      ) : (
        bookingHistory.map((ticket, index) => (
          <div
            key={index}
            className="booking-item flex items-center mb-6 p-4 border-b"
          >
            <img
              src={ticket.hinhAnh}
              alt={ticket.tenPhim}
              className="booking-image w-32 h-48 object-cover mr-4 rounded"
            />
            <div className="booking-info flex-1">
              <p className="text-lg text-orange-500 font-bold">
                <strong>{ticket.tenPhim}</strong>
              </p>
              <p className="text-sm text-white">
                Ngày đặt: {new Date(ticket.ngayDat).toLocaleString()}
              </p>
              <p className="text-sm text-white">
                Rạp: {ticket.danhSachGhe[0]?.tenRap}
              </p>
              <p className="text-sm text-white">
                Ghế: {ticket.danhSachGhe.map((ghe) => ghe.tenGhe).join(", ")}
              </p>
              <p className="text-orange-500 font-bold">
                Tổng tiền: {ticket.giaVe.toLocaleString()} VND
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
