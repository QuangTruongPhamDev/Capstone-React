import axios from "axios";
import { https } from "./config";

export const addNewService = () => {
  return https.post(
    "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh"
  );
};
