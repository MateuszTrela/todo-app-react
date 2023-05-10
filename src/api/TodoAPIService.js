import axios from "axios";

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);

export const retriveAllTodosForUsername
    = (username) => apiClient.get(`/users/${username}/todos`)

export const retriveTodoById
    = (username, id) => apiClient.get(`/users/${username}/todos/${id}`)

export const createTodo
    = (username, todo) => apiClient.post(`/users/${username}/todos`, todo)

export const updateTodo
    = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)

export const deleteTodoAPI
    =(username, id) => apiClient.delete(`/users/${username}/todos/${id}`)