import { useState } from "react";


// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNewFilmPage from "./Admin/pages/AddNewFilmPage/AddNewFilmPage";
import AdminPage from "./Admin/pages/AdminPage/AdminPage";
import UpdateNewFilmPage from "./Admin/pages/UpdateNewFilmPage/UpdateNewFilmPage";



function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <AdminPage/> */}
        <Routes>
          <Route path="/AdminPage" element={<AdminPage/>}/>
          <Route path="/UpdateNewFilmPage" element={<UpdateNewFilmPage/>}/>
          <Route path="/AddNewFilmPage" element={<AddNewFilmPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
