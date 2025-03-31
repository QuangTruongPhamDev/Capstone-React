import React from 'react'
import "./index.css";
import { useNavigate } from 'react-router-dom';

export default function Updatenew() {
    const navigate = useNavigate();
  return (
    <div className="content">
      <h3>Cập nhật mới phim</h3>
      <form>
        <label>Tên phim:</label>
        <input type="text" name="tenPhim"  required />
        <label>Trailer:</label>
        <input type="text" name="trailer" required />
        <label>Mô tả:</label>
        <input type="text" name="moTa" required />
        <label>Ngày khởi chiếu:</label>
        <input type="date" name="ngayKhoiChieu" required />
        <label>Đang chiếu:</label>
        <input type="checkbox" name="dangChieu" />
        <label>Sắp chiếu:</label>
        <input type="checkbox" name="sapChieu" />
        <label>Hot:</label>
        <input type="checkbox" name="hot" />
        <label>Số sao:</label>
        <input type="number" name="danhGia" min={0} max={5} step="0.1" />
        <label>Hình ảnh:</label>
        <input type="file" name="hinhAnh" accept="image/*" />
        <button type="submit">Cập nhật phim</button>
        <button onClick={() => navigate("/AdminPage")}> Quay lại</button>
      </form>

    </div>
  )
}
