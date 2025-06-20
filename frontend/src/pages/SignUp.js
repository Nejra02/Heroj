import React,{useState} from 'react';
import '../styles/signin.css';
import '../styles/main.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
     Swal.fire({
        title: 'Šifre se ne podudaraju!',
        showConfirmButton: false,
        timer: 1500
      });
    return;
  }

  try {
    const response = await axios.post('http://localhost:8000/auth/register', {
      ime: formData.ime,
      prezime: formData.prezime,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: "user"
    });
     Swal.fire({
        title: 'Registracija uspješna!',
        showConfirmButton: false,
        timer: 1500
      });
    window.location.href = "/signin";
  } catch (error) {
    console.error(error);
     Swal.fire({
      title: 'Greška pri registraciji!',
      showConfirmButton: false,
      timer: 1500
    });
  }
};

  const handleSignIn = () => {
    window.location.href = '/signin';
  };


  return (
      <div className="row glavni-row ">
        <div className="col-lg-6 d-none d-lg-block p-0 align-items-center form-col">
          <div className="image-container">
            <img src="/signinPhoto.png" alt="Sign Up" className="img-fluid" />
          </div>
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center form-col">
          <div className="form-container">
            <div className="text-center mb-3">
              <h2 className="fw-bold">Registracija</h2>
                <p className="text-muted">
                  Već imaš nalog? 
                  <Link to="/signin" className="text-link" onClick={handleSignIn}>
                    Prijavi se.
                  </Link>
                </p>           
            </div>
            
            <form onSubmit={handleSubmit}>

              <div className="row">
                <div className="col-md-6 mb-2">
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
              <button type="submit" className="btn btn-danger w-100 mb-3">Postani heroj</button>
              {/* AKO BUDEMO HTJELI DODATI LOG IN PREKO GOOGLE
              <div className="text-center">
                <p className="text-muted">Ili prijavi se sa</p>
                <div className="d-flex justify-content-center gap-3">
                  <button type="button" className="btn btn-outline-secondary rounded-circle social-btn">
                    <i className="bi bi-google"></i>
                  </button>
                 
                </div>
              </div>
              */}
            </form>
          </div>
        </div>
      </div>
  );
};

export default SignUp;