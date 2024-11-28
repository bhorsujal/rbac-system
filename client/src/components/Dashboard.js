import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/api";
import { getUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const [services, setServices] = useState([]);
    const user = getUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axiosInstance.get("operations/all-services/");
                setServices(response.data || []);
            } catch (err) {
                console.error("Error fetching services:", err);
                setServices([]);
            }
        };

        fetchServices();
    }, []);

    const handleServiceClick = async (service) => {
        const serviceRoutes = {
            "Threat Monitoring": "/threat-monitoring",
            "Incident Response": "/incident-response",
            "Audit Logs": "/audit-logs",
            "Compliance Reports": "/compliance-reports",
            "Patch Management": "/patch-management",
        };

        if (service.name === "User Management") {
            if (user.role.name === "Manager" || user.role.name === "Administrator") {
                navigate("/admin");
            } else {
                alert("Access denied. Only Managers or Administrators can access the Admin Panel.");
            }
            return;
        }

        try {
            const response = await axiosInstance.post("operations/check-service-access/", {
                service_name: service.name,
            });
            const { access, message } = response.data;

            if (access && serviceRoutes[service.name]) {
                navigate(serviceRoutes[service.name]);
            } else {
                alert(message);
            }
        } catch (err) {
            console.error("Error checking service access:", err);
            alert("Failed to check service access. Please try again.");
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>
                    Welcome, <span>{user?.username}</span>
                </h1>
                <h2>Role: {user?.role.name || "No Role"}</h2>
                <p>Select a service to explore:</p>
            </div>
            <div className="services-grid">
                {services.length === 0 ? (
                    <p>No services available for your role.</p>
                ) : (
                    services.map((service) => (
                        <div
                            key={service.id}
                            className="service-card"
                            onClick={() => handleServiceClick(service)}
                        >
                            <h3>{service.name}</h3>
                            <p>{service.description || "Learn more about this service."}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
