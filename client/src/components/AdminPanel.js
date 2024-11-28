import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/api";

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get("users/all-users/");
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching users:", err);
                alert("Failed to fetch users. You might not have access.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container">
            <h2>Admin Panel</h2>
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPanel;
