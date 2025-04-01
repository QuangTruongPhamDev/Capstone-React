import React, { useEffect, useState } from "react";
import { getDetailMovieService } from "../../api/movieService";
import { useParams } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Modal, Rate } from "antd";
import DetailMovieCinemaList from "./DetailMovieCinemaList";

export default function DetailMoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    getDetailMovieService(id).then((res) => {
      setMovie(res.data.content);
    });
  }, [id]);

  if (!movie) return <p>Loading...</p>;
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Movie Poster */}
        <div className="relative">
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Movie Info */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{movie.tenPhim}</h1>
          <p className="text-gray-700 mb-4">{movie.moTa}</p>
          <p className="text-red-500 font-semibold mb-4">
            Ngày khởi chiếu:{" "}
            {new Date(movie.ngayKhoiChieu).toLocaleDateString()}
          </p>
          {/* Movie Status */}
          <p className="text-green-500 font-semibold mb-4">
            Tình trạng:{" "}
            {movie.dangChieu
              ? "Đang chiếu"
              : movie.sapChieu
              ? "Sắp chiếu"
              : "Chưa có thông tin"}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-semibold">Đánh giá:</span>
            <Rate allowHalf value={movie.danhGia / 2} disabled />
          </div>

          {/* Trailer Button */}
          <button
            onClick={() => setIsTrailerOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <PlayCircleOutlined className="text-2xl" /> Trailer
          </button>
        </div>
      </div>

      {/* Trailer Modal */}
      <Modal
        open={isTrailerOpen}
        footer={null}
        onCancel={() => setIsTrailerOpen(false)}
        centered
      >
        {movie.trailer ? (
          <iframe
            width="100%"
            height="400"
            src={movie.trailer.replace("watch?v=", "embed/")}
            title={movie.tenPhim}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-center text-red-500">
            Không có trailer cho phim này
          </p>
        )}
      </Modal>
      <DetailMovieCinemaList />
    </div>
  );
}
