import { https } from "./config";



export const deleteMovieService = (maPhim) => {
    const url = `/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;
    return https.delete(url);
}