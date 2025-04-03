import axios from "axios";


const API_URL = "https://movienew.cybersoft.edu.vn/api/QuanLyPhim";
const CYBERSOFT_TOKEN = "YOUR_CYBERSOFT_TOKEN"; // Thay bằng token thật

export const addNewMovie = async (movieData) => {
    try {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
            console.error("Lỗi: Không có token đăng nhập!");
            return false;
        }

        const formData = new FormData();
        for (let key in movieData) {
            formData.append(key, movieData[key]);
        }

        const response = await axios.post(
            `${API_URL}/ThemPhimUploadHinh`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    TokenCybersoft: CYBERSOFT_TOKEN,
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );

        return response.status === 200;
    } catch (err) {
        console.error("Lỗi khi thêm phim với hình ảnh:", err.response?.data || err.message);
        return false;
    }
};
