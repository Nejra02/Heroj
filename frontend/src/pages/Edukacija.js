"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/Edukacija.css";
import Kviz from "./Kviz.js";

export default function Edukacija() {
  const [openOsnovne, setOpenOsnovne] = useState(false);
  const [openPovrede, setOpenPovrede] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [osnovne, setOsnovne] = useState([]);
  const [povrede, setPovrede] = useState([]);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/edukacija")
      .then((res) => res.json())
      .then((data) => {
        setOsnovne(data.osnovne_tehnike);
        setPovrede(data.pristup_povredi);
        setVideoList(data.videi);
      })
      .catch((err) => console.error("Greška:", err));
  }, []);

  return (
    <div className="page">
      <nav className="navbar-edukacija">
        <div className="lijevo">
            <img src="/logo.png" alt="Heroj Logo"/>
            <span className="logo">Budi nečiji heroj !</span>
          </div>
        <div className="nav-links">
          <Link to="/kviz">Kviz</Link>
          <a href="/forum">Forum</a>
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
