import React,{useState} from 'react';
import '../styles/signin.css';
import '../styles/main.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';



const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        title: 'Greška',
        text: 'Sva polja su obavezna!',
        icon: 'warning',
      });
      return;
    }

    const formData = new URLSearchParams();
    formData.append("username", email); 
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8000/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include", 
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const userResponse = await fetch("http://localhost:8000/users/me", {
        credentials: "include",
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data = await response.json();
      console.log("Token:", data.access_token, "Role:", data.role);

      
      if (data.role === "admin") {
        Swal.fire({
          title: 'Prijava uspješna!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/admin_dashboard");
      } else if (data.role === "user") {
        Swal.fire({
          title: 'Prijava uspješna!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/user_dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        title: 'Greška',
        text: 'Neuspješna prijava. Pokušaj ponovo.',
      });
    }
  };


  return (
    <div className="row glavni-row ">
        <div className="col-lg-6 d-none d-lg-block p-0 align-items-center form-col">
          <div className="image-container">
            <img src="/signinPhoto.png" alt="Sign Up" className="img-fluid" />
          </div>
        </div>
        
        
        <div className="col-lg-6 d-flex align-items-center justify-content-center form-col">
          <div className="form-container p-4 p-md-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold">Prijava</h2>
             <p className="text-muted">
              Još nisi registrovan? 
              <Link to="/signup" className="text-link">Registruj se.</Link>
            </p>
            </div>

            <form onSubmit={handleSubmit} > 
            
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email adresa</label>
                <input type="email"
                 className="form-control"
                  id="email" 
                  placeholder="Unesi email adresu"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Šifra</label>
                <input type="password" className="form-control" id="password" placeholder="Unesi šifru"  value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              
              <button type="submit" className="btn btn-danger w-100 mb-3">Prijavi se</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default SignIn;