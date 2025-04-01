import { https } from "./config";

export const getListCinemaService = () => {
  return https.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
};

export const getListClusterByCinemaService = (maHeThongRap) => {
  return https.get(
    `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
  );
};

export const getListMovieByCinemaService = (maHeThongRap) => {
  return https.get(
    `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`
  );
};

export const getRoomDetailService = (maLichChieu) => {
  return https.get(
    `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
  );
};
