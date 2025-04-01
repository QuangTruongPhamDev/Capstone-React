import { https } from "./config";

export const getListMovieService = () => {
  return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
};

export const getDetailMovieService = (id) => {
  const url = `/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`;
  return https.get(url);
};

export const getMovieShowtimeService = (id) => {
  const url = `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`;
  return https.get(url);
};
export const getListBannerService = () => {
  const url = `/api/QuanLyPhim/LayDanhSachBanner`;
  return https.get(url);
};
