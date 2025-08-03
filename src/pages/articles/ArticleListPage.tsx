import { useArticles } from "@/hooks/useArticles";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/useUserStore";
import { useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";

export default function ArticleListPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useArticles(page);

  const articles = data?.data || [];
  const otherArticles = articles.filter(
    (a: { author: { username: string | undefined } }) =>
      a.author.username !== user?.username
  );
  const totalPages = data?.meta?.totalPages || 1;

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Daftar Artikel</h1>
        <div className="gap-4 flex items-center">
          <Button
            onClick={() => navigate("/my-articles")}
            className=" text-white bg-green-500 hover:bg-green-600"
          >
            Artikel Saya
          </Button>
          <Button
            onClick={() => navigate("/articles/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            + Tambah Artikel
          </Button>
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Gagal memuat artikel.</p>}

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          🌍 Artikel Lainnya
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article: any) => (
            <ArticleCard
              key={article.id}
              article={article}
              onView={() => navigate(`/articles/${article.id}`)}
            />
          ))}
        </div>
      </section>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            ← Sebelumnya
          </Button>
          <span className="text-sm text-gray-600">
            Halaman {page} dari {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Selanjutnya →
          </Button>
        </div>
      )}
    </div>
  );
}
