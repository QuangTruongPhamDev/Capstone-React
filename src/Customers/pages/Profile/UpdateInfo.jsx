import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfoService } from "../../api/userService";
import { updateUserInfo } from "../../redux/userSlice";
import toast from "react-hot-toast";

export default function UpdateInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user); // Người dùng lưu trong redux

  // Khai báo trạng thái loading
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        taiKhoan: user.taiKhoan,
        matKhau: user.matKhau || "",
        email: user.email,
        soDt: user.soDT,
        maNhom: user.maNhom || "GP01",
        maLoaiNguoiDung: user.maLoaiNguoiDung || "KhachHang",
        hoTen: user.hoTen,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    if (loading) return; // Ngừng nếu đang trong quá trình cập nhật

    const confirmUpdate = window.confirm(
      "Bạn có chắc chắn muốn cập nhật thông tin?"
    );
    if (!confirmUpdate) return;

    try {
      setLoading(true);
      await updateUserInfoService(formData); // Gọi API cập nhật
      dispatch(updateUserInfo(formData)); // Cập nhật thông tin trong Redux
      toast.success("Cập nhật thành công!"); // Thay thế alert bằng toast.success
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Cập nhật thất bại!";
      console.error("Lỗi cập nhật:", error);
      toast.error(errorMessage); // Thay thế alert bằng toast.error
    } finally {
      setLoading(false); // Đặt lại trạng thái loading khi hoàn thành
    }
  };

  return (
    <div className="container profile-update-container py-10">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">
        Cập nhật thông tin
      </h2>
      <div className="mb-3">
        <label>Tài khoản</label>
        <input
          type="text"
          name="taiKhoan"
          className="input-field"
          value={formData.taiKhoan}
          disabled
        />
      </div>
      <div className="mb-3">
        <label>Mật khẩu</label>
        <input
          type="password"
          name="matKhau"
          className="input-field"
          value={formData.matKhau}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="input-field"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Họ tên</label>
        <input
          type="text"
          name="hoTen"
          className="input-field"
          value={formData.hoTen}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Số điện thoại</label>
        <input
          type="text"
          name="soDt"
          className="input-field"
          value={formData.soDt}
          onChange={handleChange}
        />
      </div>
      <button
        onClick={handleUpdate}
        className="update-button"
        disabled={loading}
      >
        {loading ? "Đang cập nhật..." : "Cập nhật"}
      </button>
    </div>
  );
}
