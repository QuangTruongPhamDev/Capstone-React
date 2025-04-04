import { https } from "./config";

export const addNewMovieService = () => {
  const url = `/api/QuanLyPhim/ThemPhimUploadHinh`;

  return https.post(url);
};
