import React from 'react';
import '../styles/signup.css';

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <div className="form-header text-center mb-4">
          <h2 className="fw-bold">Kreiraj Nalog</h2>
          <p className="text-muted">Već imate nalog? 
            <button 
              className="text-link btn btn-link p-0 border-0 bg-transparent"
              onClick={() => {/* Dodaj navigaciju na signin */}}
            >
              Prijavite se
            </button>
          </p>
        </div>
        
        <form className="signup-form">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="ime" className="form-label">Ime</label>
              <input type="text" className="form-control" id="ime" placeholder="Unesite vaše ime" />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="prezime" className="form-label">Prezime</label>
              <input type="text" className="form-control" id="prezime" placeholder="Unesite vaše prezime" />
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email adresa</label>
            <input type="email" className="form-control" id="email" placeholder="Unesite vaš email" />
          </div>
          
          <div className="mb-3">
            <label htmlFor="lozinka" className="form-label">Lozinka</label>
            <input type="password" className="form-control" id="lozinka" placeholder="Kreirajte lozinku" />
            <div className="form-text">Najmanje 8 karaktera</div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="potvrdiLozinku" className="form-label">Potvrdi Lozinku</label>
            <input type="password" className="form-control" id="potvrdiLozinku" placeholder="Ponovite lozinku" />
          </div>
          
          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" id="uslovi" />
            <label className="form-check-label" htmlFor="uslovi">
              Prihvatam <button className="text-link btn btn-link p-0 border-0 bg-transparent">Uslove korištenja</button> i <button className="text-link btn btn-link p-0 border-0 bg-transparent">Politiku privatnosti</button>
            </label>
          </div>
          
          <button type="submit" className="btn btn-primary w-100 mb-3">Kreiraj Nalog</button>
          
          <div className="text-center">
            <p className="text-muted">Ili se registrirajte putem</p>
            <div className="d-flex justify-content-center gap-3">
              <button type="button" className="btn btn-outline-secondary rounded-circle social-btn">
                <i className="bi bi-google"></i>
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;