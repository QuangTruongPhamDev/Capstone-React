import axios from "axios";
import {https, CYBER_TOKERN} from './config';

const API_URL = "https://movienew.cybersoft.edu.vn/api/QuanLyPhim";
const CYBERSOFT_TOKEN = "CYBER_TOKERN"; // Thay bằng token thật

// 🛠 Hàm lấy danh sách phim
export const fetchFilm = async () => {
    try {
        const res = await axios.get(`${API_URL}/LayDanhSachPhim`, {
            headers: {
                TokenCybersoft: CYBERSOFT_TOKEN,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách phim:", error);
        return [];
    }
};

// 🛠 Hàm xóa phim (Sửa lỗi truyền `maPhim`)
export const deleteFilm = async (maPhim) => {
    if (!maPhim) {
        console.error("Lỗi: Không có mã phim để xóa!");
        return false;
    }

    try {
        const res = await axios.delete(`${API_URL}/XoaPhim?MaPhim=${maPhim}`, {
            headers: {
                TokenCybersoft: CYBERSOFT_TOKEN,
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });

        return res.status === 200;
    } catch (err) {
        console.error("Lỗi khi xóa phim:", err.response?.data || err.message);
        return false;
    }
};
