import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getArticleById, updateArticle } from "@/api/article.api";
import { useUserStore } from "@/hooks/useUserStore";
import type { ArticleFormType } from "@/components/ArticleForm";
import ArticleForm from "@/components/ArticleForm";

export default function ArticleEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id!),
    enabled: !!id,
    select: (res) => res.data,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ArticleFormType) => updateArticle(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article", id] });
      navigate(`/articles/${id}`);
    },
  });

  const onSubmit = (formData: ArticleFormType) => {
    mutate(formData);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !data)
    return (
      <p className="text-center text-red-500">Gagal memuat data artikel.</p>
    );
  if (user?.username !== data.author.username) {
    return (
      <p className="text-center text-red-500">
        Kamu tidak punya akses ke artikel ini.
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Artikel</h1>
      <ArticleForm
        initialValues={data}
        onSubmit={onSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}
