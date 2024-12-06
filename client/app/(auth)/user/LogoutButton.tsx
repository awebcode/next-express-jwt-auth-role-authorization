"use client"
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const Router = useRouter();
  const logout = async () => {
    await axiosInstance.get("/logout", { withCredentials: true });
    toast({
      title: "Logout successful",
      description: "You have successfully logged out.",
    });
    Router.push("/login");
  };
  return <Button variant={"destructive"} onClick={() => logout()}>Logout</Button>;
};

export default LogoutButton;
