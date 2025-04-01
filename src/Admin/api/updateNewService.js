import { https } from "./config";

export const getUpdateNewService = () => {
  return https.post(
    "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload"
  );
};
