"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { mutate, isPending, error } = useLogin();
  const router=useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data as any, {
      onSuccess: (response) => {
        console.log("Login successful:", response);
          toast({
            title: "Login successful",
            description: "You have successfully logged in.",
          });
          router.push("/user");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please try again.",
        })
        console.error("Login failed:", error);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto max-w-7xl space-y-4"
    >
      {error && <p className="text-red-500">{(error as any).response.data.message}</p>}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
