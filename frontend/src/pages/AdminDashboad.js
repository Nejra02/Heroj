import React, { useState } from "react";
import axios from "axios";
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

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);

  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [errorQuestions, setErrorQuestions] = useState(null);

  const hostname = window.location.hostname;
  const apiBase =
    hostname === "localhost"
      ? "http://localhost:8000"
      : `http://${hostname}:8000`;

  const handleSectionChange = async (section) => {
    if (activeSection === section) {
      setActiveSection(null);
      return;
    }

    if (section === "users") {
      setLoadingUsers(true);
      setErrorUsers(null);
      try {
        const res = await axios.get(`${apiBase}/users/`);
        setRegularUsers(res.data);
      } catch (err) {
        console.error(err);
        setErrorUsers("Greška pri učitavanju korisnika.");
      } finally {
        setLoadingUsers(false);
      }
    }

    if (section === "questions") {
      setLoadingQuestions(true);
      setErrorQuestions(null);
      try {
        const res = await axios.get(`${apiBase}/kviz/pitanja`);
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
        setErrorQuestions("Greška pri učitavanju pitanja.");
      } finally {
        setLoadingQuestions(false);
      }
    }

    setActiveSection(section);
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiBase}/kviz/pitanja`, newQ);
      setQuestions([...questions, res.data]);
      setNewQ({ pitanje: "", tacan: "", netacan1: "", netacan2: "" });
      alert("Pitanje je uspešno dodano.");
    } catch (err) {
      console.error(err);
      alert("Greška pri dodavanju pitanja.");
    }
  };

  const handleDeleteQuestion = async (id) => {
    const confirm = window.confirm("Da li sigurno želiš obrisati ovo pitanje?");
    if (!confirm) return;

    try {
      await axios.delete(`${apiBase}/kviz/pitanja/${id}`);
      setQuestions(questions.filter((q) => q.pitanja_id !== id));
    } catch (err) {
      console.error(err);
      alert("Greška pri brisanju pitanja.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const response = await axios.get(
        `${apiBase}/simptomi/search?s=${encodeURIComponent(search)}`
      );
      localStorage.setItem("povrede", JSON.stringify(response.data));
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Simptom nije pronađen.");
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
                {loadingUsers ? (
                  <p>Učitavanje korisnika...</p>
                ) : errorUsers ? (
                  <p style={{ color: "red" }}>{errorUsers}</p>
                ) : regularUsers.length === 0 ? (
                  <p className="no-users-msg">Nema korisnika.</p>
                ) : (
                  regularUsers.map((user) => (
                    <div key={user.user_id} className="user-card">
                      <p>
                        <strong>Korisničko ime:</strong> {user.username}
                      </p>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {activeSection === "questions" && (
            <>
              <h2 className="user-list-title">Sva pitanja</h2>
              <div className="question-card-container">
                {loadingQuestions ? (
                  <p>Učitavanje pitanja...</p>
                ) : errorQuestions ? (
                  <p style={{ color: "red" }}>{errorQuestions}</p>
                ) : questions.length === 0 ? (
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
                      <button onClick={() => handleDeleteQuestion(q.pitanja_id)}>
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
