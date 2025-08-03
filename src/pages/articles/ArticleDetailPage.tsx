import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/useUserStore";
import { format } from "date-fns";
import { useArticleById, useDeleteArticle } from "@/hooks/useArticles";
import { toast } from "sonner";
import { useState } from "react";
import {
  useAddComment,
  useComments,
  useDeleteComment,
  useUpdateComment,
} from "@/hooks/useComments";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const { data, isLoading, isError } = useArticleById(id!);
  const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticle(
    id!
  );
  const { data: commentsData } = useComments(id!);
  const { mutate: addComment, isPending: isAdding } = useAddComment(id!);
  const { mutate: updateComment } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState<{
    id: string;
    content: string;
  } | null>(null);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    toast.promise(
      new Promise((resolve, reject) => {
        addComment(
          { content: newComment },
          {
            onSuccess: () => {
              setNewComment("");
              resolve(true);
            },
            onError: reject,
          }
        );
      }),
      {
        loading: "Mengirim komentar...",
        success: "Komentar ditambahkan!",
        error: "Gagal mengirim komentar.",
      }
    );
  };

  const handleDeleteArticle = () => {
    const confirmDelete = confirm("Yakin ingin menghapus artikel ini?");
    if (confirmDelete) {
      deleteArticle(undefined, {
        onSuccess: () => {
          toast.success("Artikel berhasil dihapus!");
          navigate("/articles");
        },
        onError: () => {
          toast.error("Gagal menghapus artikel.");
        },
      });
    }
  };

  if (isLoading) return;
  <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
    <Skeleton className="w-32 h-9 mb-4" />

    <Skeleton className="w-full h-80 rounded-lg mb-6" />
    <Skeleton className="w-3/4 h-10 mb-2" />
    <Skeleton className="w-1/3 h-4 mb-6" />

    <div className="space-y-4 mb-10">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>

    <Skeleton className="w-40 h-10 mb-2" />
    <Skeleton className="w-24 h-10" />
  </div>;
  if (isError || !data)
    return (
      <p className="text-center mt-10 text-red-500">Gagal memuat artikel.</p>
    );

  const isAuthor = user?.username === data.author.username;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <Button
        variant="outline"
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        ← Kembali
      </Button>

      <img
        src={data.thumbnail}
        alt={data.title}
        className="w-full h-80 object-cover rounded-lg shadow"
      />

      <h1 className="text-4xl font-bold mt-6 text-gray-800">{data.title}</h1>
      <div className="text-sm text-gray-500 mt-2">
        Oleh <span className="font-medium">{data.author.username}</span> ·{" "}
        {format(new Date(data.createdAt), "dd MMM yyyy")}
      </div>
      <p className="text-lg text-gray-700 mt-6">{data.summary}</p>

      {isAuthor && (
        <div className="flex gap-3 mt-8">
          <Button onClick={() => navigate(`/articles/${data.id}/edit`)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteArticle}
            disabled={isDeleting}
          >
            {isDeleting ? "Menghapus..." : "Delete"}
          </Button>
        </div>
      )}

      {/* Comments */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Komentar</h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Tulis komentar..."
            rows={3}
            className="flex-1 border rounded-md p-2"
          />
          <Button onClick={handleAddComment} disabled={isAdding}>
            {isAdding ? "Mengirim..." : "Kirim"}
          </Button>
        </div>

        {commentsData?.data?.length > 0 ? (
          <div className="space-y-4">
            {commentsData.data.map((comment: any) => {
              const isMine = comment.author.username === user?.username;

              return (
                <div
                  key={comment.id}
                  className="p-4 border rounded-md bg-gray-50 relative"
                >
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {comment.content}
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    oleh <strong>{comment.author.username}</strong>
                  </div>

                  {isMine && (
                    <div className="absolute top-2 right-2 flex gap-2 text-xs">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setEditingComment({
                            id: comment.id,
                            content: comment.content,
                          })
                        }
                      >
                        Edit
                      </Button>
                      <DeleteConfirmation
                        onConfirm={() =>
                          toast.promise(
                            new Promise((resolve, reject) => {
                              deleteComment(comment.id, {
                                onSuccess: () => resolve(true),
                                onError: reject,
                              });
                            }),
                            {
                              loading: "Menghapus komentar...",
                              success: "Komentar dihapus!",
                              error: "Gagal menghapus komentar.",
                            }
                          )
                        }
                        trigger={
                          <Button size="sm" variant="destructive">
                            Hapus
                          </Button>
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Belum ada komentar.</p>
        )}
      </div>

      <Dialog
        open={!!editingComment}
        onOpenChange={() => setEditingComment(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Komentar</DialogTitle>
          </DialogHeader>
          <textarea
            value={editingComment?.content ?? ""}
            onChange={(e) =>
              setEditingComment((prev) =>
                prev ? { ...prev, content: e.target.value } : null
              )
            }
            className="w-full border rounded-md p-2 mt-2"
            rows={4}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setEditingComment(null)}>
              Batal
            </Button>
            <Button
              onClick={() => {
                if (!editingComment?.content.trim()) return;

                toast.promise(
                  new Promise((resolve, reject) => {
                    updateComment(
                      {
                        id: editingComment.id,
                        content: editingComment.content,
                      },
                      {
                        onSuccess: () => {
                          setEditingComment(null);
                          resolve(true);
                        },
                        onError: reject,
                      }
                    );
                  }),
                  {
                    loading: "Menyimpan komentar...",
                    success: "Komentar diperbarui!",
                    error: "Gagal memperbarui komentar.",
                  }
                );
              }}
            >
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
