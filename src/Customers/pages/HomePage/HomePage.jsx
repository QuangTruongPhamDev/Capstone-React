import React from "react";
import ListMovie from "./ListMovie";
import ListBanner from "./ListBanner";
import CinemaList from "./CinemaList";
import DownloadApp from "./DownloadApp";

export default function HomePage() {
  return (
    <div className="space-y-10 bg-gray-900 text-white min-h-screen pt-20">
      <ListBanner />
      <div
        id="list-movie"
        className="container mx-auto px-4 py-4 bg-gray-800 rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6">LỊCH CHIẾU</h2>
        <ListMovie />
      </div>
      <div
        id="cinema-list"
        className="container mx-auto px-4 py-4 bg-gray-800 rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6">CỤM RẠP</h2>
        <CinemaList />
      </div>
      <div id="download-app">
        <DownloadApp />
      </div>
    </div>
  );
}
