import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Kviz.css";

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function Kviz() {
  const [pitanja, setPitanja] = useState([]);
  const [trenutno, setTrenutno] = useState(0);
  const [odgovori, setOdgovori] = useState([]);
  const [rezultat, setRezultat] = useState(null);

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
    setOdgovori([...odgovori, odgovor]);
    if (trenutno + 1 < pitanja.length) {
      setTrenutno(trenutno + 1);
    } else {
      const tacni =
        pitanja.filter((p, i) => odgovori[i] === p.tacan).length +
        (odgovor === pitanja[trenutno].tacan ? 1 : 0);
      setRezultat(tacni);
    }
  };

  const handlePovratak = () => {
    navigate("/"); // promijeni ako je druga ruta
  };

  const pokreniPonovo = () => {
    setRezultat(null);
    setTrenutno(0);
    setOdgovori([]);
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

  if (pitanja.length === 0) return <div>Učitavanje...</div>;

  if (rezultat !== null) {
    return (
      <div className="kviz-wrapper">
        <div className="kviz-container">
          <h2>Rezultat</h2>
          <p>
            Tačno ste odgovorili na {rezultat} od {pitanja.length} pitanja.
          </p>
          <button onClick={pokreniPonovo} className="restart-btn">
            Pokreni novi kviz
          </button>
          <button onClick={handlePovratak} className="povratak-btn">
            ← Povratak na dashboard
          </button>
        </div>
      </div>
    );
  }

  const pitanje = pitanja[trenutno];

  return (
    <div className="kviz-wrapper">
      <div className="kviz-container">
        <button onClick={handlePovratak} className="povratak-btn">
          Nazad
        </button>
        <h2>Pitanje {trenutno + 1} / {pitanja.length}</h2>
        <p className="pitanje">{pitanje.pitanje}</p>
        <div className="odgovori">
          {pitanje.odgovori.map((odg, idx) => (
            <button key={idx} onClick={() => handleOdgovor(odg)}>
              {odg}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
