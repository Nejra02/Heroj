import React,{useState} from 'react';
import '../styles/signin.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ✅ ispravno
const SignUp = () => {
  const [formData, setFormData] = useState({
  ime: '',
  prezime: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    alert("Šifre se ne podudaraju!");
    return;
  }

  try {
    const response = await axios.post('http://localhost:8000/auth/register', {
      ime: formData.ime,
      prezime: formData.prezime,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: "user" // ili "admin", zavisno od sistema
    });
    alert("Registracija uspješna!");
    window.location.href = "/signin"; // preusmjeri na prijavu
  } catch (error) {
    console.error(error);
    alert("Greška pri registraciji.");
  }
};

  const handleSignIn = () => {
    // Logic to navigate to Sign In page
    window.location.href = '/signin';
  };


  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <div className="col-lg-6 d-none d-lg-block p-0">
          <div className="image-container">
            <img src="/signinPhoto.jpg" alt="Sign Up" className="img-fluid" />
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
              <h2 className="fw-bold">Registracija</h2>
<p className="text-muted">
  Već imaš nalog? 
  <Link to="/signin" className="text-link" onClick={handleSignIn}>
    Prijavi se.
  </Link>
</p>            </div>
            
            <form onSubmit={handleSubmit}>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">Ime</label>
                  <input type="text" className="form-control" id="ime" placeholder="Unesi ime" value={formData.ime} onChange={handleChange}  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="surname" className="form-label">Prezime</label>
                  <input type="text" className="form-control" id="prezime" placeholder="Unesi prezime" value={formData.prezime} onChange={handleChange}  />
                </div>
              </div>
              <div className="mb-3">  
                <label htmlFor="username" className="form-label">Korisničko ime</label>
                <input type="text" className="form-control" id="username" placeholder="Unesi korisničko ime" value={formData.username} onChange={handleChange}  />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email adresa</label>
                <input type="email" className="form-control" id="email" placeholder="Unesi email adresu" value={formData.email} onChange={handleChange}  />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Šifra</label>
                <input type="password" className="form-control" id="password" placeholder="Unesi šifru" value={formData.password} onChange={handleChange}  />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Potvrdi šifru</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Potvrdi šifru" value={formData.confirmPassword} onChange={handleChange}  />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">Registruj se</button>
              <div className="text-center">
                <p className="text-muted">Ili registruj se sa</p>
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

export default SignUp;