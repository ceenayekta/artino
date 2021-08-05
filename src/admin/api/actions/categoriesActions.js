import axios from "axios";

const categoriesRequest = axios.create({
    baseURL: 'http://127.0.0.1:8080/api/categories',
});

export const receive = () => {
    return categoriesRequest.get('/')
}

export const receiveOne = (id) => {
    return categoriesRequest.get(`/${id}`)
}

export const create = (body) => {
    return categoriesRequest.post('/', body) 
}

export const update = (id, body) => {
    return categoriesRequest.put(`/${id}`, body)
}

export const remove = (id) => {
    return categoriesRequest.delete(`/${id}`)
}