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
export const getUserInfoService = (userId) => {
  const url = `/api/QuanLyNguoiDung/ThongTinTaiKhoan?TaiKhoan=${userId}`;
  return https.get(url);
};
