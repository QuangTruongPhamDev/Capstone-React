import axios from "axios";
import { CYBER_TOKERN} from './config';

// export const addNewMovieService = () => {
//   const url = `/api/QuanLyPhim/ThemPhimUploadHinh`;

//   return https.post(url);
// };

const API_URL = "https://movienew.cybersoft.edu.vn/api/QuanLyPhim";

export const addNewMovie = async (movieData) => {
  try {
    const userToken = localStorage.getItem("USER");
    if (!userToken) {
      console.error("Lỗi: Không có token đăng nhập!");
      return false;
    }

    // const formData = new FormData();
    // for (let key in movieData) {
    //   formData.append(key, movieData[key]);
    // }

    const response = await axios.post(
      `${API_URL}/ThemPhimUploadHinh`,
      movieData,
      {
        headers: {
          TokenCybersoft: CYBER_TOKERN,
          // Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return response.status === 200;
  } catch (err) {
    console.error(
      "Lỗi khi thêm phim với hình ảnh:",
      err.response?.data || err.message
    );
    return false;
  }
};
