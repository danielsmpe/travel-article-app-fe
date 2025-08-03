import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import { useRegister } from "@/hooks/useRegister";

const AuthSchema = z.object({
  username: z.string().min(6, "Username minimal 6 karakter"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
});

type AuthForm = z.infer<typeof AuthSchema>;

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: zodResolver(AuthSchema),
  });

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLogin = (data: AuthForm) => {
    loginMutation.mutate(data, {
      onError: (error: any) => {
        setAuthError(
          error.response?.data?.message || "Terjadi kesalahan saat login"
        );
      },
    });
  };

  const handleRegister = (data: AuthForm) => {
    registerMutation.mutate(data, {
      onError: (error: any) => {
        setAuthError(
          error.response?.data?.message || "Terjadi kesalahan saat mendaftar"
        );
      },
    });
  };

  const onSubmit = (data: AuthForm) => {
    if (mode === "login") {
      handleLogin(data);
    } else {
      handleRegister(data);
    }
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">
            {mode === "login" ? "Login ke Akun Anda" : "Buat Akun Baru"}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === "login"
              ? "Masukkan username dan kata sandi Anda untuk Login."
              : "Isi formulir di bawah untuk membuat akun."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register("username")} />
              {typeof errors.username?.message === "string" && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="grid gap-1">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password &&
                typeof errors.password.message === "string" && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
            </div>
            {authError && (
              <div className="text-red-500 text-sm text-center">
                {authError}
              </div>
            )}
            <Button type="submit" className="w-full">
              {mode === "login" ? "Login" : "Register"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <span>
              Belum punya akun?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setMode("register")}
                type="button"
              >
                Register sekarang
              </button>
            </span>
          ) : (
            <span>
              Sudah punya akun?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setMode("login")}
                type="button"
              >
                Login
              </button>
            </span>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
