import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import "./Header.css";

const Header = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/dashboard">ShieldOps</Link>
            </div>
            <div className="navbar-links">
                {user ? (
                    <>
                        <span>Welcome, {user.username}</span>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
