import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  const schema = mode === "login" ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginForm | RegisterForm) => {
    if (mode === "login") {
      console.log("Login Data:", data);
      // call login API
    } else {
      console.log("Register Data:", data);
      // call register API
    }
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMode("login")}
            className={`py-2 px-4 rounded ${
              mode === "login" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`py-2 px-4 rounded ${
              mode === "register" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === "register" && (
            <div>
              <label>Nama</label>
              <input
                {...register("name")}
                className="w-full border p-2 rounded"
              />
              {typeof errors.name?.message === "string" && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
          )}

          <div>
            <label>Email</label>
            <input
              {...register("email")}
              className="w-full border p-2 rounded"
            />
            {typeof errors.email?.message === "string" && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full border p-2 rounded"
            />
            {typeof errors.password?.message === "string" && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${
              mode === "login" ? "bg-blue-500" : "bg-green-500"
            }`}
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
