import { data } from "react-router-dom";
import { https } from "./config";

export const loginService = (user) => {
  const url = `/api/QuanLyNguoiDung/DangNhap`;
  return https.post(url, user);
};

export const registerUserService = (user) => {
  const url = `/api/QuanLyNguoiDung/DangKy`;
  return https.post(url, user);
};

export const getUserInfoService = async () => {
  try {
    const response = await https.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
    return response.data.content.thongTinDatVe; // Đảm bảo rằng response có trường thongTinDatVe
  } catch (error) {
    throw new Error(error.response.data || "Lỗi lấy thông tin người dùng");
  }
};

export const updateUserInfoService = (data) => {
  return https.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
};
