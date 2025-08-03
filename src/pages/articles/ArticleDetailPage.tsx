import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/useUserStore";
import { format } from "date-fns";
import { useArticleById, useDeleteArticle } from "@/hooks/useArticles";
import { toast } from "sonner";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const { data, isLoading, isError } = useArticleById(id!);
  const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticle(
    id!
  );

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !data)
    return (
      <p className="text-center mt-10 text-red-500">Gagal memuat artikel.</p>
    );

  const isAuthor = user?.username === data.author.username;

  const handleDelete = () => {
    const confirmDelete = confirm("Yakin ingin menghapus artikel ini?");
    if (confirmDelete) {
      deleteArticle(undefined, {
        onSuccess: () => {
          toast.success("Artikel berhasil dihapus!");
          navigate("/articles");
        },
        onError: () => {
          toast.error("Gagal menghapus artikel.");
        },
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <div className="top-0 left-0">
        <Button
          variant="outline"
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          ← Kembali
        </Button>
      </div>
      <img
        src={data.thumbnail}
        alt={data.title}
        className="w-full h-80 object-cover rounded-lg shadow"
      />

      <h1 className="text-4xl font-bold mt-6 text-gray-800">{data.title}</h1>
      <div className="text-sm text-gray-500 mt-2">
        Oleh <span className="font-medium">{data.author.username}</span> ·{" "}
        {format(new Date(data.createdAt), "dd MMM yyyy")}
      </div>
      <p className="text-lg text-gray-700 mt-6">{data.summary}</p>

      {isAuthor && (
        <div className="flex gap-3 mt-8">
          <Button onClick={() => navigate(`/articles/${data.id}/edit`)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Menghapus..." : "Delete"}
          </Button>
        </div>
      )}

      {/* Komentar (sementara dummy) */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Komentar</h2>
        <p className="text-sm text-gray-400">
          Belum ada komentar untuk artikel ini.
        </p>
      </div>
    </div>
  );
}
