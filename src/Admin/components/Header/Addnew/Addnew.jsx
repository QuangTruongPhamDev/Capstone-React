import React, { useState } from 'react'
import "./index.css"
import { useNavigate } from 'react-router-dom';
import { addNewFilm } from '../../../api/addNewService';

export default function Addnew({ onAddNew }) {
  const [addNew, setAddNew] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    maNhom: "GP01",
    ngayKhoiChieu: "",
    sapChieu: true,
    dangChieu: true,
    hot: true,
    danhGia: 10,
    hinhAnh: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddchange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddNew((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newfilm = await addNewFilm(addNew);
      onAddNew(newfilm);
      navigate("/AdminPage");
    } catch (err) {
      alert("lỗi khi hiện phim!");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getAddNewService()
  //   .then((res) => {
  //     console.log("res:", res);
  //     setAddNew(res.data.content);
  //   })
  //   .catch((err) => {
  //     console.log("err", err);
  //   })
  // }, []);

  return (
    <div className="content">
      <h3>Thêm mới phim</h3>
      <form onSubmit={handleAddSubmit}>
        <label>Tên phim:</label>
        <input type="text" name="tenPhim" value={addNew.tenPhim} onChange={handleAddchange} required />
        <label>Trailer:</label>
        <input type="text" name="trailer" value={addNew.trailer} onChange={handleAddchange} required />
        <label>Mô tả:</label>
        <input type="text" name="moTa" value={addNew.moTa} onChange={handleAddchange} required />
        <label>Ngày khởi chiếu:</label>
        <input type="date" name="ngayKhoiChieu" value={addNew.ngayKhoiChieu} onChange={handleAddchange} required />
        <label>Đang chiếu:</label>
        <input type="checkbox" name="dangChieu" value={addNew.dangChieu} onChange={handleAddchange} />
        <label>Sắp chiếu:</label>
        <input type="checkbox" name="sapChieu" value={addNew.sapChieu} onChange={handleAddchange} />
        <label>Hot:</label>
        <input type="checkbox" name="hot" value={addNew.hot} onChange={handleAddchange} />
        <label>Số sao:</label>
        <input type="number" name="danhGia" value={addNew.danhGia} onChange={handleAddchange} min={0} max={5} step="0.1" />
        <label>Hình ảnh:</label>
        <input type="file" name="hinhAnh" value={addNew.hinhAnh} onChange={handleAddchange} accept="image/*" />
        <button type="submit" disabled={loading}>{loading ? "Đang thêm..." : "Thêm phim"}</button>
        <button onClick={() => navigate("/AdminPage")}> Quay lại</button>
      </form>

    </div>
  );
}
