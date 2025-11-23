import './Register.css'
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    console.log(e.target.name, e.target.value);

    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      if (response.ok) {
        const data = await response.json();
        console.log("response from server ", data)
        // here in data we also recive token from backend 
        // storeTokenInLocalStorage(data.token);

        setUser({
          name: "",
          email: "",
          password: ""
        });
        navigate("/api/auth/login");
      }

    } catch (error) {
      console.error("Error during registration:", error);
    }

  }



  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div>
          <label htmlFor="name"></label>
          <input
            type="text"
            name='name'
            placeholder='name'
            value={user.name}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="email"></label>
          <input
            type="text"
            name='email'
            placeholder='email'
            value={user.email}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="text"
            name='password'
            placeholder='enter password'
            value={user.password}
            onChange={handleInput}
            required
          />
        </div>


        <button type="submit" className="auth-btn">Sign Up</button>

        <p>
          Already have an account? <NavLink to="/api/auth/login">Login</NavLink>
        </p>
      </form>
    </div>
  )
}