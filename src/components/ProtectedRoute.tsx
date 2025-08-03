import { useUserStore } from "@/hooks/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
