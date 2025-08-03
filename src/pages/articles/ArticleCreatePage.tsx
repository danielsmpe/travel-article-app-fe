import { useNavigate } from "react-router-dom";
import { useCreateArticle } from "@/hooks/useArticles";
import { toast } from "sonner";
import ArticleForm from "@/components/ArticleForm";

export default function CreateArticlePage() {
  const navigate = useNavigate();
  const { mutate: createArticle, isPending } = useCreateArticle();

  const handleSubmit = (data: any) => {
    createArticle(data, {
      onSuccess: () => {
        toast.success("Artikel berhasil dibuat!");
        navigate("/articles");
      },
      onError: () => {
        toast.error("Gagal membuat artikel.");
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Buat Artikel Baru</h1>
      <ArticleForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}
