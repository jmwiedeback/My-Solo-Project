import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="container">
        <div className="my-4 d-flex justify-content-between">
          <h1 className="mb-4">Hello {localStorage.getItem("username")}</h1>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
