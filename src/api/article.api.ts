import API from "./axios";

export const getArticles = (page: number = 1) =>
  API.get(`/articles?page=${page}`);

export const getArticleById = (id: string) => API.get(`/articles/${id}`);

export const createArticle = (data: any) => API.post("/articles", data);

export const updateArticle = (id: string, data: any) =>
  API.put(`/articles/${id}`, data);

export const deleteArticle = (id: string) => API.delete(`/articles/${id}`);
