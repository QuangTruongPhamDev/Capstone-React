import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css";

export default function Sidebar() {
  return (
    <div className='header-body'>
      <div className="header-sidebar">
        {/* Logo thay thế cho chữ CyberLearn */}
        <div className="header-logo">
          <img src="/images/logo_3.png" alt="CyberLearn Logo" className="logo-img" />
        </div>
        <ul className='header-ul'>
          <Link to="/UserPage">
          <li className='header-li'>
            <span className='header-span' href="#"><i className="fas fa-user" /> Users</span>
          </li>
          </Link>
          <Link to="/AdminPage">
            <li className="active header-li">
              <span className='header-span' href="#"><i className="fas fa-film" /> Films</span>
            </li>
          </Link>
          <Link to="/UpdateNewFilmPage">
            <li className='header-li'>
              <span className='header-span' href="#"><i className="fas fa-film" /> Update Films</span>
            </li>
          </Link>
          <Link to="/AddNewFilmPage">
            <li className='header-li'>
              <span className='header-span' href="#"><i className="fas fa-plus" /> Add new</span>
            </li>
          </Link>
          <li className='header-li'>
            <span className='header-span' href="#"><i className="fas fa-tv" /> Showtimes</span>
          </li>
          <Link to="/">
          <li className='header-li'>
            <span className='header-span' href="#"><i className="fa fa-user"></i> Đăng xuất</span>
          </li>
          </Link>
        </ul>
      </div>
    </div>

  )
}
