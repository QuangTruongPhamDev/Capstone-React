import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAdminService } from "../../../api/adminService";
import MovieForm from "../MovieForm";
import "./index.css"
import { deleteMovieService } from "../../../api/deleteMovieService";


export default function MovieList() {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    getAdminService()
      .then((res) => {
        setMovies(res.data.content);
      })
      .catch((err) => {
        console.error("Lỗi khi tải danh sách phim:", err);
      });
  }, []);

  const handleDelete = (maPhim) => {
    if (window.confirm("Bạn có chắc muốn xóa phim này không?")) {
      deleteMovieService(maPhim)
        .then(() => {
          alert("Xóa phim thành công!");
          setMovies(movies.filter(movie => movie.maPhim !== maPhim)); // Cập nhật danh sách
        })
        .catch(error => {
          console.error("Lỗi khi xóa phim:", error);
          alert("Xóa phim thất bại!");
        });
    }
  };

  useEffect(() => {
    // Hàm để xử lý việc thêm phim mới
    const handleNewMovie = () => {
      const newMovie = JSON.parse(localStorage.getItem("newMovie"));
      if (newMovie) {
        setMovies((prevMovies) => [...prevMovies, newMovie]);
        localStorage.removeItem("newMovie"); // Xóa dữ liệu sau khi đã thêm
      }
    };

    // Lắng nghe sự kiện "newMovieAdded"
    window.addEventListener("newMovieAdded", handleNewMovie);

    // Dọn dẹp khi component bị hủy
    return () => {
      window.removeEventListener("newMovieAdded", handleNewMovie);
    };
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.tenPhim.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='movielist-body'>
      <div className="movielist-main-content">
        <div className="movielist-header">
          <h1 className='movielist-h1'>Quản Lý Phim</h1>
          <button onClick={() => navigate("/AddNewFilmPage")} className="movielist-btn-add">Thêm phim</button>
        </div>

        <MovieForm showForm={showForm} setShowForm={setShowForm} />

        <input
          type="text"
          placeholder="Nhập tên phim..."
          className="movielist-search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className='movielist-table'>
          <thead>
            <tr>
              <th className='movielist-th'>Mã phim</th>
              <th className='movielist-th'>Hình ảnh</th>
              <th className='movielist-th'>Tên phim</th>
              <th className='movielist-th'>Mô tả</th>
              <th className='movielist-th'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map(movie => (
              <tr key={movie.maPhim}>
                <td className='movielist-td'>{movie.maPhim}</td>
                <td className='movielist-td'>
                  <img className='movielist-img' src={movie.hinhAnh} alt={movie.tenPhim} />
                </td>
                <td className='movielist-td'>{movie.tenPhim}</td>
                <td className='movielist-td'>{movie.moTa.substring(0, 150)}...</td>
                <td className='movielist-td'>
                  <button onClick={() => navigate("/UpdateNewFilmPage", { state: { movie } })} className="movielist-btn-edit">
                    <i className="fas fa-edit" />
                  </button>
                  <button onClick={() => handleDelete(movie.maPhim)} className="movielist-btn-delete">
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMovies.length === 0 && <p className="no-results">Không tìm thấy phim phù hợp.</p>}

        {/* Phân trang (cần thêm logic để lấy dữ liệu theo trang) */}
        <div className="pagination">
          <button>«</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>»</button>
        </div>
      </div>
    </div>
  );
}

