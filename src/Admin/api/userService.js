import { https } from "./config";

export const getuserService = () => {
  return https.get(
    "/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=tuKhoa"
  );
};
