import React,{useState} from 'react';
import '../styles/signin.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // ✅ ispravno


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("username", email);   // FastAPI OAuth2 expects "username"
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8000/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Token:", data.access_token);
      alert("Uspešna prijava!");
      // Save token or redirect here
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <div className="col-lg-6 d-none d-lg-block p-0">
          <div className="image-container">
            <img src="/signinPhoto.jpg" alt="Sign In" className="img-fluid" />
            <div className="overlay-text">
              <h1>Postani heroj u pravom smislu.</h1>
              <p>Prijavi se i nastavi svoju misiju.</p>
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="form-container p-4 p-md-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold">Prijavi se</h2>
             <p className="text-muted">
  Još nisi registrovan? 
  <Link to="/signup" className="text-link">Registruj se.</Link>
</p>
            </div>

            <form onSubmit={handleSubmit} > 
            {/* editovano  */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email adresa</label>
                <input type="email"
                 className="form-control"
                  id="email" 
                  placeholder="Enter your email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Šifra</label>
                <input type="password" className="form-control" id="password" placeholder="Unesi svoju šifru"  value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember" />
                  <label className="form-check-label" htmlFor="remember">Zapamti me</label>
                </div>
                <a href="#" className="text-link">Zaboravi si šifru?</a>
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">Prijavi se</button>
              <div className="text-center">
                <p className="text-muted">Ili prijavi se sa</p>
                <div className="d-flex justify-content-center gap-3">
                  <button type="button" className="btn btn-outline-secondary rounded-circle social-btn">
                    <i className="bi bi-google"></i>
                  </button>
                 
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;