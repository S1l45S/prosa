import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

function getTokenFromCookie() {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/token=([^;]+)/);
    return match ? match[1] : null;
}

function logout() {
    window.location.href = "/login";
}

api.interceptors.request.use(config => {
    const token = getTokenFromCookie();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            logout();
        }

        return Promise.reject(error);
    }
);

export default api;