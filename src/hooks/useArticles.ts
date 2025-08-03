import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  getPublicArticles,
} from "@/api/article.api";

export const useArticles = (page: number) =>
  useQuery({
    queryKey: ["articles", page],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return getArticles(page);
    },
    select: (res) => res.data,
  });

export const usePublicArticles = (page: number) =>
  useQuery({
    queryKey: ["articles/public", page],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return getPublicArticles(page);
    },
    select: (res) => res.data,
  });

export const useArticleById = (id: string) =>
  useQuery({
    queryKey: ["/articles", id],
    queryFn: () => getArticleById(id),
    select: (res) => res.data,
  });

export const useDeleteArticle = (id: string) =>
  useMutation({
    mutationFn: () => deleteArticle(id),
  });

export const useCreateArticle = () =>
  useMutation({
    mutationFn: (data: any) => createArticle(data),
  });
