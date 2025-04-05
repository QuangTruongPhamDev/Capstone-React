import React, { useEffect, useState } from "react";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateFilm() {
    const [updateData, setUpdateData] = useState({
        maPhim: "",
        tenPhim: "",
        trailer: "",
        moTa: "",
        ngayKhoiChieu: "",
        dangChieu: false,
        sapChieu: false,
        hot: false,
        danhGia: 0,
        hinhAnh: null
    });

    const navigate = useNavigate();
    const location = useLocation();
    const movie = location.state?.movie;

    useEffect(() => {
        if (movie) {
            setUpdateData({
                maPhim: movie.maPhim || "",
                tenPhim: movie.tenPhim || "",
                trailer: movie.trailer || "",
                moTa: movie.moTa || "",
                ngayKhoiChieu: movie.ngayKhoiChieu?.slice(0, 10) || "",
                dangChieu: movie.dangChieu || false,
                sapChieu: movie.sapChieu || false,
                hot: movie.hot || false,
                danhGia: movie.danhGia || 0,
                hinhAnh: null,
            });
        }
    }, [movie]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setUpdateData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setUpdateData((prev) => ({
            ...prev,
            hinhAnh: e.target.files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Cập nhật phim:", updateData);
        setUpdateData()
        // Gọi API cập nhật phim ở đây
    };

    return (
        <div className="Updatenew-body">
            <div className="Updatenew-content">
                <h3 className="Updatenew-h3">Cập nhật phim</h3>
                <form className="Updatenew-form" onSubmit={handleSubmit}key={updateData.maPhim}>
                    <label className="Updatenew-label">Tên phim:</label>
                    <input className="Updatenew-input" type="text" name="tenPhim" value={updateData.tenPhim} onChange={handleChange} required />

                    <label className="Updatenew-label">Trailer:</label>
                    <input className="Updatenew-input" type="text" name="trailer" value={updateData.trailer} onChange={handleChange} required />

                    <label className="Updatenew-label">Mô tả:</label>
                    <textarea className="Updatenew-input" name="moTa" value={updateData.moTa} onChange={handleChange} required />

                    <label className="Updatenew-label">Ngày khởi chiếu:</label>
                    <input className="Updatenew-input" type="date" name="ngayKhoiChieu" value={updateData.ngayKhoiChieu} onChange={handleChange} required />

                    <label className="Updatenew-label">Đang chiếu:</label>
                    <input className="Updatenew-input" type="checkbox" name="dangChieu" checked={updateData.dangChieu} onChange={handleChange} />

                    <label className="Updatenew-label">Sắp chiếu:</label>
                    <input className="Updatenew-input" type="checkbox" name="sapChieu" checked={updateData.sapChieu} onChange={handleChange} />

                    <label className="Updatenew-label">Hot:</label>
                    <input className="Updatenew-input" type="checkbox" name="hot" checked={updateData.hot} onChange={handleChange} />

                    <label className="Updatenew-label">Số sao:</label>
                    <input className="Updatenew-input" type="number" name="danhGia" value={updateData.danhGia} onChange={handleChange} min={0} max={5} step="0.1" />

                    <label className="Updatenew-label">Hình ảnh:</label>
                    <input className="Updatenew-input" type="file" name="hinhAnh" onChange={handleFileChange} accept="image/*" />

                    <div className="Updatenew-buttons">
                        <button className="Updatenew-button" type="submit" onClick={() => navigate("/AdminPage", { state: { updateData } })}>
                            Cập nhật phim
                        </button>
                        <button className="Updatenew-button" type="button" onClick={() => navigate("/AdminPage")}>
                            Quay lại
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

