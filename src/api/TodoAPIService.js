import axios from "axios";

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);

export const retriveAllTodosForUsername
    = (username) => apiClient.get(`/users/${username}/todos`)
