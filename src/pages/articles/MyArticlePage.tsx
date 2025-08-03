import { useArticles } from "@/hooks/useArticles";
import { useUserStore } from "@/hooks/useUserStore";
import { useNavigate } from "react-router-dom";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { CardContent } from "@/components/ui/card";

export default function MyArticlePage() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useArticles(1);

  const articles = data?.data || [];
  const myArticles = articles.filter(
    (a: { author: { username: string | undefined } }) =>
      a.author.username === user?.username
  );

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <Button
        variant="outline"
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        ← Kembali
      </Button>
      <h1 className="text-3xl font-bold mb-8">🧍 Artikel Saya</h1>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-xl shadow-lg backdrop-blur-lg bg-white/70 overflow-hidden"
            >
              <Skeleton className="w-full h-48" />
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex justify-between items-center mt-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>
              </CardContent>
            </motion.div>
          ))}
        </div>
      )}
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
