import React from 'react';
import '../styles/navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3 px-4 shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src="/logo.png" alt="Logo" width="48" className="me-2" />
          <span className="h4 mb-0">Heroj</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
            <li className="nav-item">
              <a className="nav-link" href="/">Provjera znanja</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Edukacija</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Forum</a>
            </li>
          </ul>
          <div className="d-flex">
            <button className="btn btn-outline-primary me-2">Login</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
