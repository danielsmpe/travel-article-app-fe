import { useQuery } from "@tanstack/react-query";
import { getArticles } from "@/api/article.api";

export const useArticles = (page: number) =>
  useQuery({
    queryKey: ["articles", page],
    queryFn: () => getArticles(page),
    select: (res) => res.data,
  });
