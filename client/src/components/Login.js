import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/api";
import { setAuth } from "../utils/auth";
import "./Auth.css";

const Login = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post("users/login/", { username, password });
            setAuth(data.access, data.refresh, data.user);
            setUser(data.user);
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="auth-input">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-input">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="auth-button" type="submit">Login</button>
                </form>
                <p className="auth-switch">
                    Don't have an account? <span onClick={() => navigate("/register")}>Register</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
