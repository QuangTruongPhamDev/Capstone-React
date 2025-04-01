import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="sidebar">
      <h2>CyberLearn</h2>
      <ul>
        test
        <li><a href="#"><i className="fas fa-user" /> Users</a></li>
        <Link to="/AdminPage">
          <li className="active"><span href="#"><i className="fas fa-film" /> Films</span></li>
        </Link>
        <Link to="/UpdateNewFilmPage">
          <li><span href="#"><i className="fas fa-film" /> Update Films</span></li>
        </Link>
        <Link to="/AddNewFilmPage">
          <li><span href="#"><i className="fas fa-plus" /> Add new</span></li>
        </Link>
        <li><a href="#"><i className="fas fa-tv" /> Showtimes</a></li>
      </ul>
    </div>

  )
}
