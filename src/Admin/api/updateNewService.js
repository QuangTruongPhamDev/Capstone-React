import axios from "axios";
import { CYBER_TOKERN } from "./config";
// import { https } from "./config";

// export const getUpdateNewService = () => {
//   return https.post(
//     "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload"
//   );
// };
const API_URL = "https://movienew.cybersoft.edu.vn/api/QuanLyPhim";
const CYBERSOFT_TOKEN = "CYBER_TOKERN";

export const updateMovie = async (movieData) => {
  try {
    const response = await axios.post(
      `${API_URL}/CapNhatPhimUpload`,
      movieData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          TokenCybersoft: CYBERSOFT_TOKEN, // Bắt buộc để API hoạt động
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Nếu API cần đăng nhập
        },
      }
    );

    return response.status === 200;
  } catch (err) {
    console.error("Lỗi khi cập nhật phim:", err.response?.data || err.message);
    return false;
  }
};
