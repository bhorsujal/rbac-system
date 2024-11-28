import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";
import ThreatMonitoring from "./components/ThreatMonitoring";
import IncidentResponse from "./components/IncidentResponse";
import AuditLogs from "./components/AuditLogs";
import ComplianceReports from "./components/ComplianceReports";
import PatchManagement from "./components/PatchManagement";
import Header from "./components/Header";
import { getUser } from "./utils/auth";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={user?.role.name === "Manager" || user?.role.name === "Administrator" ? (
            <AdminPanel />
          ) : (
            <Navigate to="/dashboard" />
          )}
        />

        <Route
          path="/threat-monitoring"
          element={user ? <ThreatMonitoring /> : <Navigate to="/login" />}
        />
        <Route
          path="/incident-response"
          element={user ? <IncidentResponse /> : <Navigate to="/login" />}
        />
        <Route
          path="/audit-logs"
          element={user ? <AuditLogs /> : <Navigate to="/login" />}
        />
        <Route
          path="/compliance-reports"
          element={user ? <ComplianceReports /> : <Navigate to="/login" />}
        />
        <Route
          path="/patch-management"
          element={user ? <PatchManagement /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
