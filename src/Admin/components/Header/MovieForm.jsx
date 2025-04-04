import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../redux/movieSlice';

export default function MovieForm({ showForm, setShowForm }) {
    const dispatch = useDispatch();
    const [movie, setMovie] = useState({ maPhim: "", tenPhim: "", hinhAnh: "", moTa: "" });

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addMovie({ id: Date.now(), ...movie }));
        setMovie({ maPhim: "", tenPhim: "", hinhAnh: "", moTa: "" });
        setShowForm(false);
    };
    const handleAddMovie = (movie) => {
        addMovie(movie.maPhim);
    }

    return (
        showForm && (
            <div className='modal'>
                <div className='modal-content'>
                    <h2>Thêm phim</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name='maPhim' placeholder='Mã phim' value={movie.maPhim} onChange={handleChange} />
                        <input type="text" name='tenPhim' placeholder='Tên phim' value={movie.tenPhim} onChange={handleChange} />
                        <input type="text" name='hinhAnh' placeholder='Hình ảnh URL' value={movie.hinhAnh} onChange={handleChange} />
                        <input type="text" name='moTa' placeholder='Mô tả' value={movie.moTa} onChange={handleChange} />
                        <button onClick={() => handleAddMovie(addMovie)} className='btn btn-success'>Lưu</button>
                        <button onClick={() => setShowForm(false)} type='button' className='btn btn-danger'>Hủy</button>
                    </form>
                </div>
            </div>
        )
    );
};
