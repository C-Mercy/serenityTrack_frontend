import React from 'react';
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>

const Navbar=() => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          
          <a className="navbar-brand" href="/">
  <img src="/favicon1.ico" alt="Logo" style={{ width: "30px", height: "30px" }} />
</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">Link</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="text" placeholder="Search" />
              <button className="btn btn-primary" type="button">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-3">
        <h3>Navbar Forms</h3>
        <p>You can also include forms inside the navigation bar.</p>
      </div>
    </div>
  );
}

export default Navbar;
