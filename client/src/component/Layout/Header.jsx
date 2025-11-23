import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo">🧠 AI PDF Assistant</NavLink>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/chat" className="nav-link">Chat</NavLink>
          <NavLink to="/features" className="nav-link">Features</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
        </nav>

        <div className="header-actions">


          <NavLink to="/logout" className="login-btn">Logout</NavLink>


          <NavLink to="/chat" className="cta-btn">Try Now</NavLink>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
};
