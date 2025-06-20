import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Forum.css";

export default function Forum() {
  const navigate = useNavigate();
  const [objave, setObjave] = useState([]);
  const [novaObjava, setNovaObjava] = useState("");
  const [noviKomentari, setNoviKomentari] = useState({});
  const [userRole, setUserRole] = useState(null);

  const hostname = window.location.hostname;
  const apiBase = hostname === "localhost" ? "http://localhost:8000" : `http://${hostname}:8000`;

  const fetchUserById = async (userId) => {
    try {
      const res = await fetch(`${apiBase}/auth/users/view/${userId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await fetch(`${apiBase}/users/me`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (data.role !== "user" && data.role !== "admin") throw new Error();
        setUserRole(data.role);
      } catch {
        navigate("/signin");
      }
    };
    checkRole();
  }, [navigate, apiBase]);

  useEffect(() => {
    const fetchSve = async () => {
      try {
        const res = await fetch(`${apiBase}/forum/`);
        const data = await res.json();
        const allUserIds = new Set();
        data.forEach((objava) => {
          objava.komentari.forEach((komentar) => {
            allUserIds.add(komentar.user_id);
          });
        });
        const userMap = {};
        await Promise.all(
          Array.from(allUserIds).map(async (id) => {
            const user = await fetchUserById(id);
            if (user) userMap[id] = user;
          })
        );
        const enriched = data.map((objava) => ({
          ...objava,
          komentari: objava.komentari.map((k) => ({
            ...k,
            autor: userMap[k.user_id] || null,
          })),
        }));
        setObjave(enriched);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSve();
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
        window.location.reload();
      }
    } catch {}
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
        window.location.reload();
      }
    } catch {}
  };

  const handlePovratak = () => {
    if (userRole === "admin") {
      navigate("/admin_dashboard");
    } else if (userRole === "user") {
      navigate("/user_dashboard");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="forum-page">
      <header className="forum-header">
        <h1>Forum</h1>
        {userRole && (
          <button onClick={handlePovratak} className="povratak-btn">Nazad</button>
        )}
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
                  <strong>
                    {komentar.autor?.role === "admin"
                      ? "Admin"
                      : komentar.autor?.username || "Nepoznat"}
                    :
                  </strong>
                  {" "}
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
