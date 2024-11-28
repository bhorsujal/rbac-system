import axios from "axios";

const API_BASE = "https://xcept1on.pythonanywhere.com/api/";
const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.response.data.detail === "Given token not valid for any token type"
        ) {
            try {
                const refresh = localStorage.getItem("refresh");
                const { data } = await axios.post(`${API_BASE}token/refresh/`, {
                    refresh,
                });
                localStorage.setItem("token", data.access);
                originalRequest.headers.Authorization = `Bearer ${data.access}`;
                return axios(originalRequest);
            } catch (err) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
