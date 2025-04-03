import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getListMovieService } from "../../api/movieService";
import { Link } from "react-router-dom";
import { Button, Card, Carousel, Pagination, Popover } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const { Meta } = Card;

export default function ListMovie() {
  let [listMovie, setListMovie] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [category, setCategory] = useState("hot");
  let dispatch = useDispatch();

  useEffect(() => {
    getListMovieService()
      .then((res) => {
        setListMovie(res.data.content);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  const filteredMovies = listMovie.filter((movie) => {
    if (category === "hot") return movie.hot;
    if (category === "dangChieu") return movie.dangChieu;
    if (category === "sapChieu") return movie.sapChieu;
    return true;
  });

  const moviesPerPage = 8;
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const renderListMovie = () => {
    return filteredMovies
      .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
      .map((movie) => {
        const desc = (
          <div className="w-80 bg-black text-white p-3 rounded-2xl">
            <p className="font-bold uppercase">{movie.tenPhim}</p>
            <p>{movie.moTa}</p>
          </div>
        );

        return (
          <div
            key={movie.maPhim}
            className="relative overflow-hidden rounded-xl"
          >
            {/* Ảnh phim */}
            <img
              alt={movie.tenPhim}
              src={movie.hinhAnh}
              className="h-72 w-full object-cover"
            />

            {/* Lớp phủ khi hover */}
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <Link
                to={`/detail/${movie.maPhim}`}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-2 hover:bg-orange-600"
              >
                Mua vé
              </Link>
              <Popover content={desc} trigger="hover">
                <button className="border border-white text-white px-4 py-2 rounded-lg bg-transparent hover:bg-white hover:text-black transition-all duration-300">
                  Xem thêm
                </button>
              </Popover>
            </div>
          </div>
        );
      });
  };

  return (
    <div className="container relative">
      {/* Danh Mục (Căn Lề Trái Theo List Phim) */}
      <div className="flex gap-4 mb-5 px-4 sm:px-8 md:px-12">
        <button
          className="px-6 py-2 rounded-md text-lg font-bold bg-red-600 text-white shadow-lg shadow-red-500/50 animate-pulse"
          onClick={() => setCategory("hot")}
        >
          Phim Hot
        </button>
        <button
          className={`px-6 py-2 rounded-md text-lg font-bold ${
            category === "dangChieu" ? "bg-orange-500" : "bg-gray-700"
          }`}
          onClick={() => setCategory("dangChieu")}
        >
          Phim Đang Chiếu
        </button>
        <button
          className={`px-6 py-2 rounded-md text-lg font-bold ${
            category === "sapChieu" ? "bg-orange-500" : "bg-gray-700"
          }`}
          onClick={() => setCategory("sapChieu")}
        >
          Phim Sắp Chiếu
        </button>
      </div>

      {/* Danh Sách Phim + Arrow */}
      <div className="relative flex items-center">
        {/* Arrow Trái - luôn hiển thị nhưng sẽ mờ đi khi không thể di chuyển trang trước */}
        <button
          className={`absolute left-0 z-10 bg-black/50 text-white p-2 rounded-full shadow-lg hover:bg-black transition-all ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} // Chỉ giảm trang khi có thể
          disabled={currentPage === 1} // Disabled khi ở trang đầu tiên
        >
          <LeftOutlined />
        </button>

        {/* Danh Sách Phim */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
          {renderListMovie()}
        </div>

        {/* Arrow Phải - luôn hiển thị nhưng sẽ mờ đi khi không thể di chuyển trang tiếp */}
        <button
          className={`absolute right-0 z-10 bg-black/50 text-white p-2 rounded-full shadow-lg hover:bg-black transition-all ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          } // Chỉ tăng trang khi có thể
          disabled={currentPage === totalPages} // Disabled khi ở trang cuối
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
}
