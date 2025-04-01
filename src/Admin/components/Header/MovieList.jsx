import React, { useEffect, useState } from 'react'
import { getAdminService } from '../../api/adminService';
import { useDispatch } from 'react-redux';
import MovieForm from './MovieForm';
import { useNavigate } from 'react-router-dom';
import { deleteFilm } from '../../api/deleteService';

export default function MovieList() {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    getAdminService()
      .then((res) => {
        console.log("res:", res);
        setMovies(res.data.content);
      })
      .catch((err) => {
        console.log("err:", err);
      })
  }, []);

 

  const handleDelete = async (maPhim) => {
          const confirmDelete = window.confirm("bạn có chắc muốn xóa phim này?");
          if (!confirmDelete) return;

          const success = await deleteFilm(maPhim);
          if (success) {
            setMovies(movies.filter((movie) => movie.maPhim != maPhim));
          }else (err) => {
            console.log("err:", err);
          }
      }


  return (
    <div className="main-content">
      <div className="header">
        <h1>Quản Lý Phim</h1>
        <button onClick={() => navigate("/AddNewFilmPage")} className="btn-add">Thêm phim</button>

        <MovieForm showForm={showForm} setShowForm={setShowForm} />

      </div>
      <input type="text" placeholder="Nhập tên phim..." className="search-box" />
      <table>
        <thead>
          <tr>
            <th>Mã phim</th>
            <th>Hình ảnh</th>
            <th>Tên phim</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.maPhim}>
              <td>{movie.maPhim}</td>
              <td><img src={movie.hinhAnh} alt={movie.moTa} /></td>
              <td>{movie.tenPhim}</td>
              <td>{movie.moTa.substring(0, 150)}...</td>
              <td>
                <button onClick={() => navigate("/UpdateNewFilmPage")} className="btn-edit"><i className="fas fa-edit" /></button>
                <button onClick={() => handleDelete(movie.maPhim)} className="btn-delete"><i className="fas fa-trash" /></button>
              </td>
            </tr>
          ))}
          {/* Thêm các phim khác */}
        </tbody>
      </table>
      {/* Phân trang */}
      <div className="pagination">
        <button>«</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>»</button>
      </div>
    </div>

  )
}

