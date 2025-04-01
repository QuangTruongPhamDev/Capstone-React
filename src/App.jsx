import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Template from "./Customers/template_customer/Template";
import HomePage from "./Customers/pages/HomePage/HomePage";
import LoginPage from "./Customers/pages/LoginPage/LoginPage";
import DetailMoviePage from "./Customers/pages/DetailMoviePage/DetailMoviePage";
import NotFoundPage from "./Customers/pages/NotFoundPage/NotFoundPage";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import BookingTicketsPage from "./Customers/pages/BookingTicketsPage/BookingTicketsPage";
import Template_Booking from "./Customers/template_customer/Template_Booking";
import LoadingPage from "./Customers/components/Loading/LoadingPage";
import RegisterPage from "./Customers/pages/RegisterPage/RegisterPage";

function App() {
  return (
    <div>
      <LoadingPage />
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Template content={<HomePage />} />} />;
          <Route path="/login" element={<Template content={<LoginPage />} />} />
          <Route
            path="/register"
            element={<Template content={<RegisterPage />} />}
          />
          <Route
            path="/detail/:id"
            element={<Template content={<DetailMoviePage />} />}
          />
          <Route
            path="/chitietphongve/:maLichChieu"
            element={<Template_Booking content={<BookingTicketsPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
