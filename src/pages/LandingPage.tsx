import { useNavigate } from "react-router-dom";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { usePublicArticles } from "@/hooks/useArticles";
import { useUserStore } from "@/hooks/useUserStore";

export default function LandingPage() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { data: articles, isLoading, isError } = usePublicArticles(1);

  const topArticles = articles?.data?.slice(0, 6) || [];

  const handleClick = (id: string) => {
    if (user) {
      navigate(`/articles/${id}`);
    } else {
      navigate("/auth");
    }
  };

  const handleAllArticles = () => {
    if (user) {
      navigate("/articles");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] px-6 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-[#333] leading-tight">
          Temukan <span className="text-[#FF6B6B]">Petualangan</span> Baru
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Artikel pilihan tentang destinasi terbaik di dunia 🌍
        </p>
        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleAllArticles}
            className="bg-[#4D96FF] hover:bg-[#3b7ddb] px-6 py-3 text-white rounded-full shadow-lg text-lg"
          >
            Lihat Semua Artikel
          </Button>
        </div>
      </motion.div>

      {/* Article Cards */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Gagal memuat data.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {topArticles.map((article: any, i: number) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.015] transition-all backdrop-blur-lg bg-white/70 overflow-hidden cursor-pointer"
              onClick={() => handleClick(article.id)}
            >
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[#222]">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {article.summary.slice(0, 80)}...
                </p>
                <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                  <span>by {article.author.username}</span>
                  <Button
                    className="text-xs px-3 py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(article.id);
                    }}
                  >
                    Detail
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
