import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Kviz.css";
import "../styles/landingpage.css";

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function Kviz() {
  const [pitanja, setPitanja] = useState([]);
  const [trenutno, setTrenutno] = useState(0);
  const [odgovori, setOdgovori] = useState([]);
  const [pregledOdgovori, setPregledOdgovori] = useState([]);
  const [rezultat, setRezultat] = useState(null);
  const [prikaziPregled, setPrikaziPregled] = useState(false);
  const [kvizZapoceo, setKvizZapoceo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/kviz/pitanja")
      .then((res) => res.json())
      .then((data) => {
        const pripremljena = data.map((p) => ({
          ...p,
          odgovori: shuffleArray([p.tacan, p.netacan1, p.netacan2]),
        }));
        setPitanja(pripremljena);
      });
  }, []);

  const handleOdgovor = (odgovor) => {
    const trenutnoPitanje = pitanja[trenutno];
    const noviOdgovori = [
      ...odgovori,
      {
        pitanje: trenutnoPitanje.pitanje,
        tacan: trenutnoPitanje.tacan,
        izabrani: odgovor,
      },
    ];

    if (trenutno + 1 < pitanja.length) {
      setOdgovori(noviOdgovori);
      setTrenutno(trenutno + 1);
    } else {
      const tacni = noviOdgovori.filter((o) => o.izabrani === o.tacan).length;
      setOdgovori(noviOdgovori);
      setPregledOdgovori(noviOdgovori);
      setRezultat(tacni);
    }
  };

  const handlePovratak = () => {
    navigate("/");
  };

  const pokreniPonovo = () => {
    setRezultat(null);
    setTrenutno(0);
    setOdgovori([]);
    setPregledOdgovori([]);
    setPrikaziPregled(false);
    setKvizZapoceo(true);

    fetch("http://localhost:8000/kviz/pitanja")
      .then((res) => res.json())
      .then((data) => {
        const pripremljena = data.map((p) => ({
          ...p,
          odgovori: shuffleArray([p.tacan, p.netacan1, p.netacan2]),
        }));
        setPitanja(pripremljena);
      });
  };

  if (!kvizZapoceo) {
    return (
      <div className="kviz-wrapper">
        <div className="kviz-container">
          <h1 className="kviz-title">Dobrodošli u kviz!</h1>
          <div className="kviz-uvod">
            <p>Testirajte svoje znanje!</p>
            <p>Kviz se sastoji od 10 pitanja, a za svako pitanje ponuđena su tri odgovora.</p>
            <p>Samo jedan odgovor je tačan – odaberite pažljivo!</p>
            <p>Sretno!</p>
          </div>

          <button onClick={() => setKvizZapoceo(true)} className="kviz-btn primary">
            🚀 Započni kviz
          </button>
          <button onClick={handlePovratak} className="kviz-btn secondary">
            ← Nazad na početnu
          </button>
        </div>
      </div>
    );
  }

  if (pitanja.length === 0) return <div className="kviz-loading">Učitavanje...</div>;

  if (rezultat !== null) {
    return (
      <div className="kviz-wrapper">
        <div className="kviz-container">
          {!prikaziPregled ? (
            <>
              <h2 className="kviz-title">Rezultat</h2>
              <p className="kviz-rezultat">
                Tačno ste odgovorili na <strong>{rezultat}</strong> od{" "}
                <strong>{pitanja.length}</strong> pitanja.
              </p>
              <button onClick={() => setPrikaziPregled(true)} className="kviz-btn primary">
                📋 Pogledaj odgovore
              </button>
              <button onClick={pokreniPonovo} className="kviz-btn primary">
                🔁 Pokreni novi kviz
              </button>
              <button onClick={handlePovratak} className="kviz-btn secondary">
                ← Povratak na dashboard
              </button>
            </>
          ) : (
            <>
              <h2 className="kviz-title">Pregled odgovora</h2>
              <div className="kviz-pregled">
                {pregledOdgovori.map((o, idx) => (
                  <div key={idx} className="kviz-pregled-item">
                    <p style={{ fontWeight: "bold" }}>{idx + 1}. {o.pitanje}</p>
                    <p>
                      Vaš odgovor:{" "}
                      <span style={{ backgroundColor: "inherit", color: o.izabrani === o.tacan ? "green" : "red" }}>
                        {o.izabrani}
                      </span>
                    </p>
                    {o.izabrani !== o.tacan && (
                      <p>Tačan odgovor: <span style={{ color: "green", backgroundColor: "inherit" }}>{o.tacan}</span></p>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={pokreniPonovo} className="kviz-btn primary">
                🔁 Pokreni ponovo
              </button>
              <button onClick={handlePovratak} className="kviz-btn secondary">
                ← Nazad
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  const pitanje = pitanja[trenutno];

  return (
    <div className="kviz-wrapper">
      <div className="kviz-container">
        <div className="kviz-header">
          <button onClick={handlePovratak} className="kviz-btn back">
            ← Nazad
          </button>
          <span className="kviz-progress">
            Pitanje {trenutno + 1} / {pitanja.length}
          </span>
        </div>
        <h2 className="kviz-question">{pitanje.pitanje}</h2>
        <div className="kviz-answers">
          {pitanje.odgovori.map((odg, idx) => (
            <button
              key={idx}
              onClick={() => handleOdgovor(odg)}
              className="kviz-answer-btn"
            >
              {odg}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
