import React, { useEffect, useState } from "react";
import {
  getListCinemaService,
  getListClusterByCinemaService,
  getListMovieByCinemaService,
} from "../../api/cinemaService";
import { Link } from "react-router-dom";

export default function CinemaList() {
  const [cinemaSystems, setCinemaSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [cinemaClusters, setCinemaClusters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    getListCinemaService()
      .then((res) => setCinemaSystems(res.data.content || []))
      .catch((err) => console.error("Error fetching cinema systems:", err));
  }, []);

  const handleSelectSystem = (maHeThongRap) => {
    setSelectedSystem(maHeThongRap);
    setCinemaClusters([]); // Reset cụm rạp khi đổi hệ thống rạp
    setShowtimes([]); // Reset lịch chiếu
    getListClusterByCinemaService(maHeThongRap)
      .then((res) => setCinemaClusters(res.data.content || []))
      .catch((err) => console.error("Error fetching cinema clusters:", err));
  };

  const handleSelectCluster = (maCumRap) => {
    setSelectedCluster(maCumRap);
    setShowtimes([]); // Reset lịch chiếu trước khi load dữ liệu mới
    getListMovieByCinemaService(selectedSystem)
      .then((res) => {
        const movies = [];
        res.data.content[0]?.lstCumRap.forEach((cumRap) => {
          if (cumRap.maCumRap === maCumRap) {
            cumRap.danhSachPhim.forEach((phim) => {
              if (!movies.find((p) => p.maPhim === phim.maPhim)) {
                movies.push(phim);
              }
            });
          }
        });
        setShowtimes(movies);
      })
      .catch((err) => console.error("Error fetching showtimes:", err));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-800 text-white border border-gray-700">
      {/* Cột 1: Hệ thống rạp */}
      <div className="border-r border-gray-700 overflow-auto max-h-[500px]">
        {cinemaSystems.map((system) => (
          <div
            key={system.maHeThongRap}
            className={`p-2 flex items-center gap-2 cursor-pointer border-b border-gray-700 relative 
          ${
            selectedSystem === system.maHeThongRap
              ? "border-r-4 border-orange-500 bg-gray-700"
              : "hover:border-r-4 hover:border-gray-500"
          }`}
            onClick={() => handleSelectSystem(system.maHeThongRap)}
          >
            <img
              src={system.logo}
              alt={system.tenHeThongRap}
              className="w-12 h-12 object-contain"
            />
            <span className="truncate">{system.tenHeThongRap}</span>
          </div>
        ))}
      </div>

      {/* Cột 2: Cụm rạp */}
      <div className="border-r border-gray-700 overflow-auto max-h-[500px]">
        {cinemaClusters.map((cluster) => (
          <div
            key={cluster.maCumRap}
            className={`p-2 cursor-pointer border-b border-gray-700 relative 
          ${
            selectedCluster === cluster.maCumRap
              ? "border-r-4 border-orange-500 bg-gray-700"
              : "hover:border-r-4 hover:border-gray-500"
          }`}
            onClick={() => handleSelectCluster(cluster.maCumRap)}
          >
            <p className="font-bold text-orange-400 truncate">
              {cluster.tenCumRap}
            </p>
            <p className="text-sm text-gray-400 truncate">{cluster.diaChi}</p>
          </div>
        ))}
      </div>

      {/* Cột 3: Lịch chiếu */}
      <div className="h-[400px] overflow-y-auto p-2">
        {showtimes.length > 0 ? (
          showtimes.map((phim) => (
            <div
              key={phim.maPhim}
              className="p-4 border-b border-gray-700 flex flex-col md:flex-row"
            >
              {/* Hình ảnh phim */}
              {phim.hinhAnh && (
                <img
                  src={phim.hinhAnh}
                  alt={phim.tenPhim}
                  className="w-20 h-28 object-cover rounded-md mr-4"
                />
              )}
              <div>
                {/* Tên phim */}
                <p className="font-bold text-lg flex items-center">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full mr-2">
                    C18
                  </span>
                  {phim.tenPhim}
                </p>

                {/* Danh sách lịch chiếu */}
                {phim.lstLichChieuTheoPhim?.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {phim.lstLichChieuTheoPhim.map((lichChieu) => {
                      const [year, month, dayTime] =
                        lichChieu.ngayChieuGioChieu.split("-");
                      const [day, time] = dayTime.split("T");

                      return (
                        <Link
                          to={`/chitietphongve/${lichChieu.maLichChieu}`}
                          key={lichChieu.maLichChieu}
                          className="bg-white text-orange-500 px-2 py-1 rounded flex items-center cursor-pointer hover:bg-orange-500 hover:text-white transition duration-200"
                        >
                          {`${day}/${month}/${year}`}
                          <span className="text-orange-500 mx-2">~</span>
                          <span className="text-red-500 font-bold">
                            {time.slice(0, 5)}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-400">Không có lịch chiếu</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Chọn cụm rạp để xem lịch chiếu</p>
        )}
      </div>
    </div>
  );
}
