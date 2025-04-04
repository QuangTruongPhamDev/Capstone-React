import React, { useState } from "react";

import "./index.css";
import { useNavigate } from "react-router-dom";
import { addNewMovie } from "../../../api/addNewMovieService";


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
  
    const formData = new FormData();
    for (let key in addNew) {
      if (key === "ngayKhoiChieu" && addNew[key]) {
        const date = new Date(addNew[key]);
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${
          (date.getMonth() + 1).toString().padStart(2, "0")
        }/${date.getFullYear()}`;
        formData.append(key, formattedDate);
      } else {
        formData.append(key, addNew[key]);
      }
    }
  
    // Log formData để kiểm tra dữ liệu
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  
    const success = await addNewMovie(formData); // Gọi API thêm phim
    if (success) {
      alert("Thêm phim thành công!");
      navigate("/AdminPage");
    } else {
      alert("Lỗi khi thêm phim!");
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
