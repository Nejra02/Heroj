import React, { useEffect, useState } from 'react'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/card.css';
import '../styles/search.css';
import '../styles/main.css';

function LandingPage() {
  const [pomoci, setPomoci] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const hostname = window.location.hostname;
    const apiBase = hostname === 'localhost' ? 'http://localhost:8000' : `http://${hostname}:8000`;

    fetch(`${apiBase}/pomoc/random?count=3`)
      .then(res => res.json())
      .then(data => {
        setPomoci(data);
      })
      .catch(err => console.error('Greška:', err));
  }, []);

  return (
    <div className='app-wrapper'>
      {/* Navbar komponenta */}
      <Navbar />

      {/* Search bar */}
      <div className="container mt-5">
        <div className="input-group mb-5 custom-search">
          <input
            type="text"
            placeholder="Pretraži simptome, postupke ili situacije..."
            className="form-control custom-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="input-group-text custom-search-icon">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      {/* Kartice */}
      <div className="card-container container mb-5">
        <div className="row align-items-stretch">
          {pomoci.map((p, index) => (
            <div className="col-md-4 d-flex" key={index}>
              <div className="custom-card w-100" onClick={() => window.location.href = '/'}>
                <h5 className="card-title">{p.naziv}</h5>
                <ul className="card-text">
                  {p.koraci.map((korak, i) => (
                    <li key={i}>{korak}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer komponenta */}
      <Footer />
    </div>
  );
}

export default LandingPage;
