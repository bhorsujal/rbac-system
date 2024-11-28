import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
    });
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const { data } = await axiosInstance.get("operations/roles/");
                setRoles(data);
                setFormData((prev) => ({ ...prev, role: data[0]?.name || "" }));
            } catch (err) {
                console.error("Failed to fetch roles:", err);
                alert("Failed to load roles. Please try again later.");
            }
        };

        fetchRoles();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("users/register/", formData);
            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (err) {
            alert("Registration failed. Please check your inputs.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="auth-input">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="auth-input">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="auth-input">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="auth-input">
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            {roles.map((role) => (
                                <option key={role.id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="auth-button" type="submit">Register</button>
                </form>
                <p className="auth-switch">
                    Already have an account? <span onClick={() => navigate("/login")}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
