import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";
import { addNewMovie } from "../../../api/addNewService";

export default function AddNewFilm() {
  const [addNew, setAddNew] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    dangChieu: false,
    sapChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: null,
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "checkbox") {
      setAddNew({ ...addNew, [name]: checked });
    } else if (type === "file") {
      setAddNew({ ...addNew, [name]: files[0] }); // Lưu file ảnh vào state
    } else {
      setAddNew({ ...addNew, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in addNew) {
      formData.append(key, addNew[key]);
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
            <button className="addnew-button" type="submit" onClick={() => navigate(addNew.maPhim)}>
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
