import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AuthPage from "../pages/AuthPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import ArticleListPage from "@/pages/articles/ArticleListPage";
import ArticleCreatePage from "@/pages/articles/ArticleCreatePage";
import ArticleDetailPage from "@/pages/articles/ArticleDetailPage";
import ArticleEditPage from "@/pages/articles/ArticleEditPage";
import MyArticlePage from "@/pages/articles/MyArticlePage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/articles" element={<ArticleListPage />} />
        <Route path="/my-articles" element={<MyArticlePage />} />
        <Route path="/articles/create" element={<ArticleCreatePage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/articles/:id/edit" element={<ArticleEditPage />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
