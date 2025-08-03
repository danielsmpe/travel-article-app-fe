import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const articleSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  summary: z.string().min(10, "Ringkasan minimal 10 karakter"),
  content: z.string().min(20, "Konten minimal 20 karakter"),
  thumbnail: z.string().url("Masukkan URL thumbnail yang valid"),
});

export type ArticleFormType = z.infer<typeof articleSchema>;

type Props = {
  initialValues?: Partial<ArticleFormType>;
  onSubmit: (data: ArticleFormType) => void;
  isSubmitting?: boolean;
};

export default function ArticleForm({
  initialValues,
  onSubmit,
  isSubmitting,
}: Props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ArticleFormType>({
    resolver: zodResolver(articleSchema),
    defaultValues: initialValues,
  });

  const thumbnailUrl = watch("thumbnail");

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Judul Artikel</label>
          <Input placeholder="Judul artikel" {...register("title")} />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">URL Thumbnail</label>
          <Input placeholder="https://..." {...register("thumbnail")} />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
          )}
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="Preview"
              className="mt-3 w-full h-48 object-cover rounded-lg border"
            />
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Ringkasan</label>
          <Textarea
            placeholder="Ringkasan singkat artikel"
            rows={4}
            {...register("summary")}
          />
          {errors.summary && (
            <p className="text-red-500 text-sm">{errors.summary.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Konten</label>
          <Textarea
            placeholder="Isi lengkap artikel"
            rows={8}
            {...register("content")}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        <div className="space-x-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            ← Kembali
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>{" "}
      </form>
    </div>
  );
}
