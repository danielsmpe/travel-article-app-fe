import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/api/axios";

export const useComments = (articleId: string, page = 1) => {
  return useQuery({
    queryKey: ["comments", articleId, page],
    queryFn: async () => {
      const res = await API.get(
        `/articles/${articleId}/comments?page=${page}&limit=10`
      );
      return res.data;
    },
  });
};

// Tambah komentar baru
export const useAddComment = (articleId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { content: string }) =>
      API.post(`/articles/${articleId}/comments`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", articleId],
      });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      API.patch(`/comments/${id}`, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => API.delete(`/comments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
