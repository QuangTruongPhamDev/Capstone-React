import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./index.css";
import { updateMovie } from '../../../api/updateNewService';

export default function UpdateFilm({ movie, onUpdateSuccess }) {
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

    useEffect(() => {
        if (movie) {
            setUpdateData({
                maPhim: movie.maPhim || "",
                tenPhim: movie.tenPhim || "",
                trailer: movie.trailer || "",
                moTa: movie.moTa || "",
                ngayKhoiChieu: movie.ngayKhoiChieu || "",
                dangChieu: movie.dangChieu || false,
                sapChieu: movie.sapChieu || false,
                hot: movie.hot || false,
                danhGia: movie.danhGia || 0,
                hinhAnh: null,
            });
        }
    }, [movie]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdateData({
            ...updateData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleFileChange = (e) => {
        setUpdateData({ ...updateData, hinhAnh: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const movieData = new FormData();
        for (let key in updateData) {
            if (key === "hinhAnh" && updateData[key] === null) continue;
            movieData.append(key, updateData[key]);
        }

        const success = await updateMovie(movieData);
        if (success) {
            alert("Cập nhật phim thành công!");
            onUpdateSuccess();
        } else {
            alert("Cập nhật thất bại!");
        }
    };

    return (
        <div className='Updatenew-body'>
            <div className="Updatenew-content">
                <h3 className='Updatenew-h3'>Cập nhật phim</h3>
                <form className='Updatenew-form' onSubmit={handleSubmit}>
                    <label className='Updatenew-label'>Tên phim:</label>
                    <input className='Updatenew-input' type="text" name="tenPhim" value={updateData.tenPhim} onChange={handleChange} required />

                    <label className='Updatenew-label'>Trailer:</label>
                    <input className='Updatenew-input' type="text" name="trailer" value={updateData.trailer} onChange={handleChange} required />

                    <label className='Updatenew-label'>Mô tả:</label>
                    <textarea className='Updatenew-input' name="moTa" value={updateData.moTa} onChange={handleChange} required />

                    <label className='Updatenew-label'>Ngày khởi chiếu:</label>
                    <input className='Updatenew-input' type="date" name="ngayKhoiChieu" value={updateData.ngayKhoiChieu} onChange={handleChange} required />

                    <label className='Updatenew-label'>Đang chiếu:</label>
                    <input className='Updatenew-input' type="checkbox" name="dangChieu" checked={updateData.dangChieu} onChange={handleChange} />

                    <label className='Updatenew-label'>Sắp chiếu:</label>
                    <input className='Updatenew-input' type="checkbox" name="sapChieu" checked={updateData.sapChieu} onChange={handleChange} />

                    <label className='Updatenew-label'>Hot:</label>
                    <input className='Updatenew-input' type="checkbox" name="hot" checked={updateData.hot} onChange={handleChange} />

                    <label className='Updatenew-label'>Số sao:</label>
                    <input className='Updatenew-input' type="number" name="danhGia" value={updateData.danhGia} onChange={handleChange} min={0} max={5} step="0.1" />

                    <label className='Updatenew-label'>Hình ảnh:</label>
                    <input className='Updatenew-input' type="file" name="hinhAnh" onChange={handleFileChange} accept="image/*" />

                    <div className="Updatenew-buttons">
                        <button className='Updatenew-button' type="submit" onClick={() => navigate(`/AdminPage/${updateData.maPhim}`)}>Cập nhật phim</button>
                        <button className='Updatenew-button' type="button" onClick={() => navigate("/AdminPage")}>Quay lại</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

