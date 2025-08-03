import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        TravelApp
      </Link>
      <nav className="space-x-4">
        <Link to="/auth">
          <Button variant="outline">Login</Button>
        </Link>
      </nav>
    </header>
  );
}
