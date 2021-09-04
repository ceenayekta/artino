import axios from "axios";

const categoriesRequest = axios.create({
  baseURL: "http://127.0.0.1:8080/api",
});

export const getCategories = () => {
  return categoriesRequest.get("/categories");
};

export const getProducts = () => {
  return categoriesRequest.get("/products");
};
export const getOneProduct = (id) => {
  return categoriesRequest.get(`/products/${id}`);
};

export const getPictures = () => {
  return categoriesRequest.get("/pictures");
};
export const getProductGallery = (isMainPicture, productId) => {
  return categoriesRequest.get(`/pictures/${isMainPicture}/${productId}`);
};
