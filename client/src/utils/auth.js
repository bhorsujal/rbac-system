import { jwtDecode } from "jwt-decode";

export const setAuth = (access, refresh, user) => {
    console.log("Setting auth data:", { access, refresh, user });
    localStorage.setItem("token", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem("user");
    console.log("Retrieved user from localStorage:", user);
    return user ? JSON.parse(user) : null;
};

export const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
};

export const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return true;
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
};
