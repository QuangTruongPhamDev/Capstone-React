import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMovieShowtimeService } from "../../api/movieService";

export default function DetailMovieCinemaList() {
  const { id } = useParams();
  const [cinemaList, setCinemaList] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);

  useEffect(() => {
    getMovieShowtimeService(id).then((res) => {
      setCinemaList(res.data.content.heThongRapChieu);
      if (res.data.content.heThongRapChieu.length > 0) {
        setSelectedCinema(res.data.content.heThongRapChieu[0]);
      }
    });
  }, [id]);
  return (
    <div className="mx-auto py-10 px-4 grid grid-cols-12 gap-6">
      {/* Cột 1: Logo Hệ Thống Rạp */}
      <div className="col-span-12 sm:col-span-4 border-b sm:border-r sm:pr-4 space-y-4 mb-6 sm:mb-0">
        {cinemaList.map((cinema) => (
          <div
            key={cinema.maHeThongRap}
            className={`cursor-pointer p-2 rounded-lg flex items-center gap-4 border ${
              selectedCinema?.maHeThongRap === cinema.maHeThongRap
                ? "border-orange-500"
                : "border-gray-300"
            } hover:border-red-500 transition`}
            onClick={() => setSelectedCinema(cinema)}
          >
            <img
              src={cinema.logo}
              alt={cinema.tenHeThongRap}
              className="w-16 h-16"
            />
            <span className="font-semibold">{cinema.tenHeThongRap}</span>
          </div>
        ))}
      </div>

      {/* Cột 2: Lịch Chiếu */}
      <div className="col-span-12 sm:col-span-8">
        {selectedCinema &&
          selectedCinema.cumRapChieu.map((cumRap) => (
            <div key={cumRap.maCumRap} className="mb-6">
              <h3 className="text-lg font-bold mb-2">{cumRap.tenCumRap}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {cumRap.lichChieuPhim.map((lichChieu) => (
                  <Link
                    to={`/chitietphongve/${lichChieu.maLichChieu}`}
                    key={lichChieu.maLichChieu}
                    className="bg-orange-500 text-white text-center py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    {new Date(lichChieu.ngayChieuGioChieu).toLocaleDateString()}{" "}
                    ~
                    {new Date(lichChieu.ngayChieuGioChieu).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
