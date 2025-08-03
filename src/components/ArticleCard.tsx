// components/ArticleCard.tsx
import { Button } from "@/components/ui/button";

interface ArticleCardProps {
  article: any;
  isAuthor?: boolean;
  onEdit?: () => void;
  onView?: () => void;
}

export function ArticleCard({
  article,
  isAuthor = false,
  onEdit,
  onView,
}: ArticleCardProps) {
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
          <Button size="sm" onClick={onView}>
            Detail
          </Button>
          {isAuthor && onEdit && (
            <Button size="sm" variant="outline" onClick={onEdit}>
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
