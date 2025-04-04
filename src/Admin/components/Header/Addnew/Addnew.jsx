import React, { useEffect, useState } from "react";

import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { addNewMovieService } from "../../../api/addNewMovieService";


export default function AddNewFilm() {
  const [addNew, setAddNew] = useState({
    maPhim: "",
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    dangChieu: false,
    sapChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: "", // Đảm bảo hinhAnh là tệp khi người dùng chọn
  });

  const navigate = useNavigate();

  // Đảm bảo khi chọn tệp, bạn cập nhật đúng kiểu cho hinhAnh
  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    setAddNew((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value, // Xử lý đúng với hinhAnh (tệp)
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const selectedImage = addNew.hinhAnh;

    // Kiểm tra tệp hình ảnh hợp lệ
    if (selectedImage && !(selectedImage instanceof File)) {
      alert("Vui lòng chọn một tệp hình ảnh.");
      return;
    }

    if (selectedImage && !validImageTypes.includes(selectedImage.type)) {
      alert("Hình ảnh phải có định dạng *.jpg, *.png hoặc *.gif.");
      return;
    }

  
   // Tạo FormData
   const formData = new FormData();
   for (let key in addNew) {
     // Nếu là hình ảnh, append tệp
     if (key === "hinhAnh" && addNew.hinhAnh instanceof File) {
       console.log("Hình ảnh được chọn:", addNew.hinhAnh); // Kiểm tra tệp
       formData.append("hinhAnh", addNew.hinhAnh); // Gửi tên 'hinhAnh' theo yêu cầu của API
     } else {
       formData.append(key, addNew[key]); // Append các thuộc tính khác
     }
   }
     // Gửi yêu cầu tới API
     try {
      const res = await addNewMovieService(formData);
      const { data } = res;
      console.log("Thêm phim thành công:", data.content);

      // Lưu thông tin phim mới vào localStorage (tùy chọn)
      localStorage.setItem("newMovie", JSON.stringify(data.content));

      // Gửi sự kiện khi phim mới đã được thêm
      window.dispatchEvent(new Event("newMovieAdded"));

      // Điều hướng về trang quản lý phim
      navigate("/AdminPage");
    } catch (error) {
      console.error("Lỗi khi thêm phim:", error.response?.data || error.message);
    }
  };


  return (
    <div className="addnew-body">
      <div className="addnew-content">
        <h3 className="addnew-h3">Thêm mới phim</h3>
        <form className="addnew-form" onSubmit={handleSubmit}>
          <label className="addnew-label">Tên phim:</label>
          <input
            className="addnew-input"
            type="text"
            name="tenPhim"
            value={addNew.tenPhim}
            onChange={handleChange}
            required
          />

          <label className="addnew-label">Trailer:</label>
          <input
            className="addnew-input"
            type="text"
            name="trailer"
            value={addNew.trailer}
            onChange={handleChange}
            required
          />

          <label className="addnew-label">Mô tả:</label>
          <input
            className="addnew-input"
            type="text"
            name="moTa"
            value={addNew.moTa}
            onChange={handleChange}
            required
          />

          <label className="addnew-label">Ngày khởi chiếu:</label>
          <input
            className="addnew-input"
            type="date"
            name="ngayKhoiChieu"
            value={addNew.ngayKhoiChieu}
            onChange={handleChange}
            required
          />

          <label className="addnew-label">Đang chiếu:</label>
          <input
            className="addnew-input"
            type="checkbox"
            name="dangChieu"
            checked={addNew.dangChieu}
            onChange={handleChange}
          />

          <label className="addnew-label">Sắp chiếu:</label>
          <input
            className="addnew-input"
            type="checkbox"
            name="sapChieu"
            checked={addNew.sapChieu}
            onChange={handleChange}
          />

          <label className="addnew-label">Hot:</label>
          <input
            className="addnew-input"
            type="checkbox"
            name="hot"
            checked={addNew.hot}
            onChange={handleChange}
          />

          <label className="addnew-label">Số sao:</label>
          <input
            className="addnew-input"
            type="number"
            name="danhGia"
            value={addNew.danhGia}
            onChange={handleChange}
            min={0}
            max={5}
            step="0.1"
          />

          <label className="addnew-label">Hình ảnh:</label>
          <input
            className="addnew-input"
            type="file"
            name="hinhAnh"
            onChange={handleChange}
            accept="image/*"
          />

          <div className="addnew-buttons">
            <button className="addnew-button" type="submit">
              Thêm phim
            </button>
            <button
              className="addnew-button"
              type="button"
              onClick={() => navigate("/AdminPage")}
            >
              Quay lại
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
