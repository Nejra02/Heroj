import React, { useEffect, useState } from 'react';

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
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-light bg-light px-4">
        <div className="d-flex align-items-center">
          <img src="/logo.png" alt="Logo" width="40" className="me-2" />
          <span className="navbar-brand mb-0 h1">Projekat Heroj</span>
        </div>
        <div>
          <button className="btn btn-outline-primary me-2">Login</button>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </nav>

      {/* Search bar */}
      <div className="container mt-4">
        <input
          type="text"
          placeholder="Pretraži prvu pomoć..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Prikaz random pomoći */}
      <div className="container mt-4">
        <div className="row">
          {pomoci.map(p => (
            <div key={p.pomoc_id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{p.naziv}</h5>
                  <ul className="card-text">
                    {p.koraci && p.koraci.map((korak, i) => (
                      <li key={i}>{korak}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
