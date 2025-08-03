import { useArticles } from "@/hooks/useArticles";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/useUserStore";

export default function ArticleListPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { data, isLoading, isError } = useArticles(1);

  const articles = data?.data || [];
  const myArticles = articles.filter(
    (a: { author: { username: string | undefined } }) =>
      a.author.username === user?.username
  );
  const otherArticles = articles.filter(
    (a: { author: { username: string | undefined } }) =>
      a.author.username !== user?.username
  );

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Daftar Artikel</h1>
        <Button
          onClick={() => navigate("/articles/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          + Tambah Artikel
        </Button>
      </div>

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {isError && <p className="text-red-500">Gagal memuat artikel.</p>}

      {myArticles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            🧍 Artikel Saya
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myArticles.map((article: any) => (
              <ArticleCard
                key={article.id}
                article={article}
                isAuthor
                navigate={navigate}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          🌍 Artikel Lainnya
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article: any) => (
            <ArticleCard
              key={article.id}
              article={article}
              isAuthor={false}
              navigate={navigate}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ArticleCard({
  article,
  isAuthor,
  navigate,
}: {
  article: any;
  isAuthor: boolean;
  navigate: (path: string) => void;
}) {
  return (
    <div className="relative rounded-lg shadow hover:shadow-lg bg-white overflow-hidden">
      {isAuthor && (
        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded z-10">
          Milik Saya
        </span>
      )}
      <img
        src={article.thumbnail}
        alt={article.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{article.title}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {article.summary.slice(0, 80)}...
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Author: {article.author.username}
        </p>
        <div className="flex gap-2 mt-4">
          <Button size="sm" onClick={() => navigate(`/articles/${article.id}`)}>
            Detail
          </Button>

          {isAuthor && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/articles/${article.id}/edit`)}
              >
                Edit
              </Button>
              {/* Tombol delete bisa ditambahkan di sini */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
