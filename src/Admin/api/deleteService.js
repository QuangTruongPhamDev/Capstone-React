import axios from "axios";
import { https } from "./config";

export const getDeleteService = () => {
  return https.delete(
    "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim"
  );
};

export const deleteFilm = async (maPhim) => {
  try {
    await axios.delete(`${getDeleteService}/${maPhim}`);
    return true;
  } catch (err) {
    console.log("lỗi khi xóa Phim:", err);
    return false;
  }
};


