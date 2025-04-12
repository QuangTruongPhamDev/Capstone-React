import { https } from "./config";



// export const updateMovieService = () => {
//     const url = `/api/QuanLyPhim/CapNhatPhimUpload`;
//     return https.post(url);
// }

export const updateMovieService = (formData) => {
    const url = `/api/QuanLyPhim/CapNhatPhimUpload`;
    return https.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // ⚠️ Đảm bảo token đúng tên
      },
    });
  };