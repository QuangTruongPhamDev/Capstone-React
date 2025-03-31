import axios from "axios";
import { https } from "./config";

export const getAddNewService = () => {
  return https.post(
    "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh"
  );
};

export const getNew = async () => {
    try {
      const res = await axios.get(getAddNewService);
      return res.data;
    } catch (err) {
      console.error("Lỗi khi lấy danh sách phim:", err);
      return [];
    }
  };

export const addNewFilm = async (filmData) => {
  try {
    const res = await axios.post(getAddNewService, filmData, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
};
