import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Template from "./Customers/template_customer/Template";
import HomePage from "./Customers/pages/HomePage/HomePage";
import LoginPage from "./Customers/pages/LoginPage/LoginPage";
import DetailMoviePage from "./Customers/pages/DetailMoviePage/DetailMoviePage";
import NotFoundPage from "./Customers/pages/NotFoundPage/NotFoundPage";
import LoadingPage from "./Customers/components/Loading/LoadingPage";
import RegisterPage from "./Customers/pages/RegisterPage/RegisterPage";
import Template_Booking from "./Customers/template_customer/Template_Booking";
import BookingTicketsPage from "./Customers/pages/BookingTicketsPage/BookingTicketsPage";
import AdminPage from "./Admin/pages/AdminPage/AdminPage";
import AddNewFilmPage from "./Admin/pages/AddNewFilmPage/AddNewFilmPage";
import UpdateNewFilmPage from "./Admin/pages/UpdateNewFilmPage/UpdateNewFilmPage";
import Template_Admin from "./Admin/template_admin/template_admin";


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
          <Route path="/AdminPage" element={<Template_Admin content={<AdminPage />} />} />
          <Route path="/AddNewFilmPage" element={<Template_Admin content={<AddNewFilmPage />} />} />
          <Route path="/UpdateNewFilmPage" element={<Template_Admin content={<UpdateNewFilmPage />} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
