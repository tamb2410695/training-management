import api from "../../services/api";

export const login = async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
};

export const register = (data) => {
    return api.post("/auth/register", data);
};