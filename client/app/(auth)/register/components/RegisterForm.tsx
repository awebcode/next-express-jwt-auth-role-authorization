"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const router=useRouter()
  const { mutate, isPending,error } = useRegister();
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data, {
      onSuccess: (response) => {

        toast({
          title: "Registration successful",
          description: "You have successfully registered.",
        })
        router.push('/login')
      },
      onError: (error) => {
        console.error("Registration failed:", error);
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Please try again.",
        })
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {error && <p className="text-red-500">{(error as any).response.data.message}</p>}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
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
        {isPending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};
