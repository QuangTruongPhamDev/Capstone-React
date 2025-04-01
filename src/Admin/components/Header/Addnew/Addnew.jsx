import React, { useState } from 'react'
import "./index.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Addnew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleAddChange = (e) => {
    setAddNew({ ...addNew, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewFilm(addNew));
    navigate("/AdminPage");
  }


  return (
    <div className="content">
      <h3>Thêm mới phim</h3>
      <form onSubmit={handleSubmit}>
        <label>Tên phim:</label>
        <input type="text" name="tenPhim" value={addNew.tenPhim} onChange={handleAddChange} required />
        <label>Trailer:</label>
        <input type="text" name="trailer" value={addNew.trailer} onChange={handleAddChange} required />
        <label>Mô tả:</label>
        <input type="text" name="moTa" value={addNew.moTa} onChange={handleAddChange} required />
        <label>Ngày khởi chiếu:</label>
        <input type="date" name="ngayKhoiChieu" value={addNew.ngayKhoiChieu} onChange={handleAddChange} required />
        <label>Đang chiếu:</label>
        <input type="checkbox" name="dangChieu" value={addNew.dangChieu} onChange={handleAddChange} />
        <label>Sắp chiếu:</label>
        <input type="checkbox" name="sapChieu" value={addNew.sapChieu} onChange={handleAddChange} />
        <label>Hot:</label>
        <input type="checkbox" name="hot" value={addNew.hot} onChange={handleAddChange} />
        <label>Số sao:</label>
        <input type="number" name="danhGia" value={addNew.danhGia} onChange={handleAddChange} min={0} max={5} step="0.1" />
        <label>Hình ảnh:</label>
        <input type="file" name="hinhAnh" value={addNew.hinhAnh} onChange={handleAddChange} accept="image/*" />
        <button type="submit" >Thêm phim</button>
        <button onClick={() => navigate("/AdminPage")}> Quay lại</button>
      </form>

    </div>
  );
}
