import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Forum.css";

export default function Forum() {
  const navigate = useNavigate();
  const [objave, setObjave] = useState([]);
  const [novaObjava, setNovaObjava] = useState("");
  const [noviKomentari, setNoviKomentari] = useState({});

  const hostname = window.location.hostname;
  const apiBase = hostname === "localhost" ? "http://localhost:8000" : `http://${hostname}:8000`;

  const fetchObjave = async () => {
    try {
      const response = await fetch(`${apiBase}/forum/`);
      const data = await response.json();
      setObjave(data);
    } catch (err) {
      console.error("Greška pri dohvaćanju objava:", err);
    }
  };
    useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await fetch(`${apiBase}/users/me`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        const data = await res.json();
        if (data.role !== "user" && data.role !== "admin") {
          throw new Error("Unauthorized role");
        }
      } catch (error) {
        console.error("Unauthorized access or error:", error);
        navigate("/signin"); 
      }
    };

    checkRole();
  }, [navigate, apiBase]);

  useEffect(() => {
    fetchObjave();
  }, [apiBase]);

  const handleNovaObjava = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBase}/forum/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tekst_objave: novaObjava }),
      });
      if (response.ok) {
        setNovaObjava("");
        fetchObjave();
      }
    } catch (err) {
      console.error("Greška pri dodavanju objave:", err);
    }
  };

  const handleNoviKomentar = async (e, objavaId) => {
    e.preventDefault();
    try {
      const komentar = noviKomentari[objavaId];

      const response = await fetch(`${apiBase}/user_forum/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          objava_id: objavaId,
          tekst_komentara: komentar,
        }),
      });
      if (response.ok) {
        setNoviKomentari((prev) => ({ ...prev, [objavaId]: "" }));
        fetchObjave();
      }
    } catch (err) {
      console.error("Greška pri dodavanju komentara:", err);
    }
  };

  const handlePovratak = () => {
    window.location.href = "/user_dashboard";
  };

  return (
    <div className="forum-page">
      <header className="forum-header">
        <h1>Forum</h1>
        <button onClick={handlePovratak} className="povratak-btn">Nazad</button>
      </header>

      <form className="nova-objava-form" onSubmit={handleNovaObjava}>
        <textarea
          value={novaObjava}
          onChange={(e) => setNovaObjava(e.target.value)}
          placeholder="Napiši novu objavu..."
          required
        />
        <button type="submit">Objavi</button>
      </form>

      <div className="objave-container">
        {objave.map((objava) => (
          <div key={objava.objava_id} className="objava-card">
            <p className="tekst-objave">{objava.tekst_objave}</p>
            <div className="komentari-container">
              {objava.komentari.map((komentar) => (
                <div key={komentar.komentar_id} className="komentar">
                  {komentar.tekst_komentara}
                </div>
              ))}
            </div>
            <form onSubmit={(e) => handleNoviKomentar(e, objava.objava_id)} className="novi-komentar-form">
              <input
                type="text"
                value={noviKomentari[objava.objava_id] || ""}
                onChange={(e) =>
                  setNoviKomentari((prev) => ({
                    ...prev,
                    [objava.objava_id]: e.target.value,
                  }))
                }
                placeholder="Dodaj komentar..."
                required
              />
              <button type="submit">Komentariši</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
