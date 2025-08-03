import { Navigate } from "react-router-dom";
import { useUserStore } from "@/hooks/useUserStore";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = useUserStore((s) => s.user);

  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}
