import { use, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  };


  // function received from context
  const { storeTokenInLocalStorage } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
      )

      if (response.ok) {
        const data = await response.json();

        // Now here we call the function to store token in local storage
        storeTokenInLocalStorage(data.token);

        setUser({
          email: "",
          password: ""
        })
        navigate("/");
      }

      const data = await response.json();
      console.log("Login", data);
    } catch (error) {
      console.log("error during Login", error)
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Login</h2>
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
        <button type="submit" className="auth-btn">Login</button>

        <p>
          Don't have an account? <NavLink to="/register">Sign Up</NavLink>
        </p>
      </form>
    </div>
  );
}
