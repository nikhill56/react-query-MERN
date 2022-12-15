import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
        <p class="text-2xl ...">Workout Body</p>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
