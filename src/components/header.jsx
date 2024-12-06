import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUserMd, FaSchool, FaClipboardList, FaBook, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">

          <a className="navbar-brand" onClick={() => navigate('/')}>
            <img src="/favicon1.ico" alt="Logo" style={{ width: "30px", height: "30px" }} />
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/')}>
                  <FaHome /> Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/therapists')}>
                  <FaUserMd /> Specialists
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/sessions')}>
                  <FaClipboardList /> Sessions
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/episodes')}>
                  <FaBook /> Episodes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/schools')}>
                  <FaSchool /> Schools
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/profiles')}>
                  <FaUser /> Profiles
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="text" placeholder="Search" />
              <button className="btn btn-primary" type="button">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
