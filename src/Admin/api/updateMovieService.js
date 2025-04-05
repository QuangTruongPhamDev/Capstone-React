import { https } from "./config";



export const updateMovieService = () => {
    const url = `/api/QuanLyPhim/CapNhatPhimUpload`;
    return https.post(url);
}