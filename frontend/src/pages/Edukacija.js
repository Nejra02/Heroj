"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../styles/Edukacija.css";
import Kviz from "./Kviz.js";
import Forum from "./Forum.js";
import UserDashboard from "./UserDashboard.js"

export default function Edukacija() {
  const [openOsnovne, setOpenOsnovne] = useState(false);
  const [openPovrede, setOpenPovrede] = useState(false);
  const [openSlike, setOpenSlike] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [osnovne, setOsnovne] = useState([]);
  const [povrede, setPovrede] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
      const hostname = window.location.hostname;
      const apiBase = hostname === "localhost" ? "http://localhost:8000" : `http://${hostname}:8000`;

      
      fetch(`${apiBase}/users/me`, {
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Unauthorized");
          }
          return res.json();
        })
        .then((data) => {
          if (data.role !== "user" && data.role !== "admin") {
            throw new Error("Unauthorized role");
          }
          setUserRole(data.role); 

          
          fetch(`${apiBase}/edukacija`)
            .then((res) => res.json())
            .then((data) => {
              setOsnovne(data.osnovne_tehnike);
              setPovrede(data.pristup_povredi);
              setVideoList(data.videi);
            })
            .catch((err) => console.error("Greška:", err));
        })
        .catch((error) => {
          console.error("Unauthorized access or error:", error);
          navigate("/signin");
        });
    }, [navigate]);

  return (
    <div className="page">
      <nav className="navbar-edukacija">
        <div className="lijevo">
            <img src="/logo.png" alt="Heroj Logo"/>
            <span className="logo">Budi nečiji heroj !</span>
          </div>
        <div className="nav-links">
          <Link to="/kviz">Kviz</Link>
          <Link to="/forum">Forum</Link>
          
          <Link to="/user_dashboard">Nazad</Link>
          
        </div>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <h1>Učite prvu pomoć<br />na jednostavan način</h1>
          <p>Video lekcije, slike i upute — sve na jednom mjestu.</p>
        </div>
        <div className="hero-image">
          <img src="/cpr.png" alt="CPR ilustracija" />
        </div>
      </section>

      <section className="cards">
        <div className="card">
          <h3> Osnovne tehnike</h3>
          <p>Saznajte nešto više o osnovnim tehnikama prve pomoći.</p>
        </div>
        <div className="card">
          <h3> Postupanje kod povreda</h3>
          <p>Šta uraditi kod preloma, uganuća, rana itd.</p>
        </div>
        <div className="card">
          <h3> Slike</h3>
          <p>Vizualni prikaz ispravnog pružanja prve pomoći.</p>
        </div>
        <div className="card">
          <h3> Video</h3>
          <p>Pogledajte edukativne videe iz oblasti prve pomoći.</p>
        </div>
      </section>

      {/* OSNOVNE TEHNIKE */}
      <div className="osnovne-wrapper">
        <button className="accordion-button" onClick={() => setOpenOsnovne(!openOsnovne)}>
          {openOsnovne ? "−" : "+"} Osnovne tehnike
        </button>

        {openOsnovne && (
          <div className="tehnike-content">
            {osnovne.map((t, index) => (
              <div className="tehnika-blok" key={t.osnovne_tehnike_id}>
                <h2>{index + 1}. <strong>{t.naziv}</strong></h2>
                <div className="linija">
                  <p>{t.opis}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* POVREDE */}
      <div className="osnovne-wrapper">
        <button className="accordion-button" onClick={() => setOpenPovrede(!openPovrede)}>
          {openPovrede ? "−" : "+"} Postupanje kod povreda
        </button>

        {openPovrede && (
          <div className="tehnike-content">
            {povrede.map((p, index) => (
              <div className="tehnika-blok" key={p.pristup_povredi_id}>
                <h2>{index + 1}. <strong>{p.naziv}</strong></h2>
                <div className="linija">
                  <p>{p.opis}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SLIKE */}
      <div className="osnovne-wrapper">
        <button className="accordion-button" onClick={() => setOpenSlike(!openSlike)}>
          {openSlike ? "−" : "+"} Slike
        </button>

        {openSlike && (
          <div className="tehnike-content slike-container">
            <img src="/slika1.png" alt="DRSABCD" className="first-aid-image" />
            <img src="/slika2.jpg" alt="Seizure First Aid" className="first-aid-image" />
            <img src="/slika3.webp" alt="Wounds First Aid" className="first-aid-image" />
            <img src="/slika4.webp" alt="Wounds First Aid" className="first-aid-image" />
          </div>
        )}
      </div>

      {/* VIDEI */}
      <div className="osnovne-wrapper">
        <button className="accordion-button" onClick={() => setOpenVideo(!openVideo)}>
          {openVideo ? "−" : "+"} Video lekcije
        </button>

        {openVideo && (
          <div className="tehnike-content">
            {videoList.map((v, index) => (
              <div className="tehnika-blok" key={v.video_id}>
                <iframe
                  width="100%"
                  height="315"
                  src={v.link}
                  title={`Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
