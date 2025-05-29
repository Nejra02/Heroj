import React, { useState } from "react";
import "../styles/AdminDashboard.css";

export default function UserAdminPanel() {
  const [search, setSearch] = useState("");
  const [regularUsers, setRegularUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newQ, setNewQ] = useState({
    pitanje: "",
    tacan: "",
    netacan1: "",
    netacan2: "",
  });
  const [activeSection, setActiveSection] = useState(null);

  const hostname = window.location.hostname;
  const apiBase =
    hostname === "localhost"
      ? "http://localhost:8000"
      : `http://${hostname}:8000`;

  const handleSectionChange = (section) => {
    if (activeSection === section) {
      setActiveSection(null);
      return;
    }

    if (section === "users") {
      fetch(`${apiBase}/users/`)
        .then((res) => {
          if (!res.ok) throw new Error(`Greška sa servera: ${res.status}`);
          return res.json();
        })
        .then((data) => setRegularUsers(data))
        .catch((err) => {
          console.error(err);
          alert("Ne mogu dohvatiti korisnike.");
        });
    }

    if (section === "questions") {
      fetch(`${apiBase}/kviz/pitanja`)
        .then((res) => {
          if (!res.ok) throw new Error(`Greška sa servera: ${res.status}`);
          return res.json();
        })
        .then((data) => setQuestions(data))
        .catch((err) => {
          console.error(err);
          alert("Ne mogu dohvatiti pitanja.");
        });
    }

    setActiveSection(section);
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiBase}/kviz/pitanja`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQ),
      });

      if (!res.ok) throw new Error("Greška pri dodavanju pitanja");

      const added = await res.json();
      setQuestions([...questions, added]);
      setNewQ({ pitanje: "", tacan: "", netacan1: "", netacan2: "" });
      alert("Pitanje je uspešno dodano.");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteQuestion = async (id) => {
    const confirm = window.confirm("Da li sigurno želiš obrisati ovo pitanje?");
    if (!confirm) return;

    try {
      const res = await fetch(`${apiBase}/kviz/pitanja/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Greška pri brisanju pitanja");

      setQuestions(questions.filter((q) => q.pitanja_id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `${apiBase}/simptomi/search?s=${encodeURIComponent(search)}`
      );
      if (!response.ok) throw new Error("Simptom nije pronađen.");

      const data = await response.json();
      localStorage.setItem("povrede", JSON.stringify(data));
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-panel-wrapper">
      <header className="dashboard-header">
        <div className="admin-header-left">
          <img src="/logo.png" alt="Logo" className="admin-logo" />
          <span className="admin-name">Admin</span>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži simptome..."
          />
        </form>
      </header>

      <div className="admin-panel-body">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-group">
            <button onClick={() => handleSectionChange("users")}>
              {activeSection === "users" ? "Sakrij korisnike" : "Prikaži korisnike"}
            </button>
          </div>
          <div className="admin-sidebar-group">
            <button onClick={() => handleSectionChange("questions")}>
              {activeSection === "questions" ? "Sakrij pitanja" : "Prikaži kviz pitanja"}
            </button>
          </div>
          <div className="admin-sidebar-group">
            <button onClick={() => handleSectionChange("add")}>
              {activeSection === "add" ? "Sakrij formu" : "Dodaj novo pitanje"}
            </button>
          </div>
        </aside>

        <main className="admin-main-content">
          {activeSection === "users" && (
            <>
              <h2 className="user-list-title">Registrovani korisnici</h2>
              <div className="user-list">
                {regularUsers.length === 0 ? (
                  <p className="no-users-msg">Nema korisnika.</p>
                ) : regularUsers.map(user => (
                    <div key={user.user_id} className="user-card">
                      <p><strong>Korisničko ime:</strong> {user.username}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                    </div>
                  ))

                }
              </div>
            </>
          )}

          {activeSection === "questions" && (
            <>
              <h2 className="user-list-title">Sva pitanja</h2>
              <div className="question-card-container">
                {questions.length === 0 ? (
                  <p className="no-users-msg">Nema dostupnih pitanja.</p>
                ) : (
                  questions.map((q) => (
                    <div key={q.pitanja_id} className="user-card">
                      <p>
                        <strong>Pitanje:</strong> {q.pitanje}
                      </p>
                      <p>
                        <strong>Tačan:</strong> {q.tacan}
                      </p>
                      <p>
                        <strong>Netačan 1:</strong> {q.netacan1}
                      </p>
                      <p>
                        <strong>Netačan 2:</strong> {q.netacan2}
                      </p>
                      <button onClick={() => handleDeleteQuestion(q.pitanja_id)} >
                        Obriši
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {activeSection === "add" && (
            <div className="add-question-form">
              <h2 className="user-list-title">Dodaj novo pitanje</h2>
              <form onSubmit={handleAddQuestion} className="custom-form">
                <input
                  type="text"
                  placeholder="Pitanje"
                  value={newQ.pitanje}
                  onChange={(e) => setNewQ({ ...newQ, pitanje: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Tačan odgovor"
                  value={newQ.tacan}
                  onChange={(e) => setNewQ({ ...newQ, tacan: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Netačan odgovor 1"
                  value={newQ.netacan1}
                  onChange={(e) => setNewQ({ ...newQ, netacan1: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Netačan odgovor 2"
                  value={newQ.netacan2}
                  onChange={(e) => setNewQ({ ...newQ, netacan2: e.target.value })}
                  required
                />
                <button type="submit">Dodaj pitanje</button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
