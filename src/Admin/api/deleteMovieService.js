import {https, CYBER_TOKERN} from './config';



// export const deleteMovieService = (maPhim) => {
//     const url = `/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;
//     return https.delete(url);
// }

export const deleteMovieService = (maPhim) => {
    const userInfo = JSON.parse(localStorage.getItem("USER"));
  
    if (!userInfo || !userInfo.accessToken) {
      console.error("Không tìm thấy accessToken. Vui lòng đăng nhập lại.");
      return Promise.reject("Unauthorized");
    }
  
    const url = `/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;
  
    return https.delete(url, {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        TokenCybersoft: CYBER_TOKERN, // thay CYBERSOFT_TOKEN bằng token thật của bạn
      },
    });
  };