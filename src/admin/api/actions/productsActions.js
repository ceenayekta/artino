import axios from "axios";

const productsRequest = axios.create({
  baseURL: "http://127.0.0.1:8080/api/products",
});

export const receive = () => {
  return productsRequest.get("/");
};

export const receiveOne = (id) => {
  return productsRequest.get(`/${id}`);
};

export const receivePicture = (id, main_picture) => {
  return productsRequest.get(`/${id}/${main_picture}`);
};

export const create = (body) => {
  return productsRequest.post("/", body);
};

export const update = (id, body) => {
  return productsRequest.put(`/${id}`, body);
};

export const remove = (id) => {
  return productsRequest.delete(`/${id}`);
};
