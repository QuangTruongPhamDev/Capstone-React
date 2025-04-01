import { https } from "./config"



export const getAdminService = () => {
    return https.get("https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
}
