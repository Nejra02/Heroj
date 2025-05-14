import React from 'react';
import '../styles/signin.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
const SignUp = () => {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <div className="col-lg-6 d-none d-lg-block p-0">
          <div className="image-container">
            <img src="/signinPhoto.jpg" alt="Sign Up" className="img-fluid" />
            <div className="overlay-text">
              <h1>Postani heroj u pravom smislu.</h1>
              <p>Prijavi se i nastavi svoju misiju.</p>
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="form-container p-4 p-md-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold">Registracija</h2>
              <p className="text-muted">Već imaš nalog? <a href="#" className="text-link">Prijavi se.</a></p>
            </div>
            
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Ime i prezime</label>
                <input type="text" className="form-control" id="name" placeholder="Unesi ime i prezime" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email adresa</label>
                <input type="email" className="form-control" id="email" placeholder="Unesi email adresu" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Šifra</label>
                <input type="password" className="form-control" id="password" placeholder="Unesi šifru" />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Potvrdi šifru</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Potvrdi šifru" />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">Registruj se</button>
              <div className="text-center">
                <p className="text-muted">Ili registruj se sa</p>
                <div className="d-flex justify-content-center gap-3">
                  <button type="button" className="btn btn-outline-secondary rounded-circle social-btn">
                    <i className="bi bi-google"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;