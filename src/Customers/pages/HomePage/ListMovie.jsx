import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getListMovieService } from "../../api/movieService";
import { Link } from "react-router-dom";
import { Button, Card, Carousel, Pagination, Popover } from "antd";

const { Meta } = Card;

export default function ListMovie() {
  let [listMovie, setListMovie] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
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

  const renderListMovie = () => {
    return listMovie
      .slice((currentPage - 1) * 8, currentPage * 8)
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

            {/* Tiêu đề phim */}
            <Meta
              title={
                <div className="text-center font-bold">{movie.tenPhim}</div>
              }
            />
          </div>
        );
      });
  };

  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {renderListMovie()}
      </div>

      {/* Pagination More với căn giữa */}
      <div className="flex justify-center mt-10">
        <Pagination
          current={currentPage}
          pageSize={8}
          total={listMovie.length}
          showSizeChanger={false}
          hideOnSinglePage
          onChange={(page) => setCurrentPage(page)}
          className="pagination-custom"
        />
      </div>
      <style jsx>{`
        .pagination-custom .ant-pagination-item {
          background-color: transparent;
          border-color: white;
          color: white;
        }
        .pagination-custom .ant-pagination-item:hover {
          background-color: #4b4b4b;
        }
        .pagination-custom .ant-pagination-item-active {
          background-color: #f56a00;
          border-color: #f56a00;
        }
        .pagination-custom .ant-pagination-prev,
        .pagination-custom .ant-pagination-next {
          color: white;
        }
        .pagination-custom .ant-pagination-prev:hover,
        .pagination-custom .ant-pagination-next:hover {
          background-color: #4b4b4b;
        }

        /* Thay đổi màu mũi tên khi hover */
        .pagination-custom .ant-pagination-prev .ant-pagination-item-link,
        .pagination-custom .ant-pagination-next .ant-pagination-item-link {
          color: white;
        }
        .pagination-custom .ant-pagination-prev:hover .ant-pagination-item-link,
        .pagination-custom
          .ant-pagination-next:hover
          .ant-pagination-item-link {
          color: #f56a00;
        }
      `}</style>
    </div>
  );
}
