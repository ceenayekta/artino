import axios from "axios";

const imagesRequest = axios.create({
  baseURL: "http://127.0.0.1:8080/api/pictures",
});

export const receive = () => {
  return imagesRequest.get("/");
};

export const receiveOne = (id) => {
  return imagesRequest.get(`/${id}`);
};

export const create = (body) => {
  return imagesRequest.post("/", body);
};

export const update = (id, body) => {
  return imagesRequest.put(`/${id}`, body);
};

export const remove = (id) => {
  return imagesRequest.delete(`/${id}`);
};
