import { useArticles } from "@/hooks/useArticles";
import { useUserStore } from "@/hooks/useUserStore";
import { useNavigate } from "react-router-dom";
import { ArticleCard } from "@/components/ArticleCard";

export default function MyArticlePage() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useArticles(1); // bisa pagination kalau mau

  const articles = data?.data || [];
  const myArticles = articles.filter(
    (a: { author: { username: string | undefined } }) =>
      a.author.username === user?.username
  );

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8">🧍 Artikel Saya</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Gagal memuat artikel.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myArticles.map((article: any) => (
          <ArticleCard
            key={article.id}
            article={article}
            isAuthor
            onView={() => navigate(`/articles/${article.id}`)}
            onEdit={() => navigate(`/articles/${article.id}/edit`)}
          />
        ))}
      </div>
    </div>
  );
}
