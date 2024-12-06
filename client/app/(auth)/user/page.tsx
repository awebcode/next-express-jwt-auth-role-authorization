import axiosInstance from "@/lib/axiosInstance";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";
import { redirect } from "next/navigation";

const fetchUserProfile = async () => {
  const cookieStore = await cookies(); // Get cookies from the server
  const token = cookieStore.get("token")?.value; // Replace 'token' with your cookie name

  const { data } = await axiosInstance.get("/profile", {
    headers: {
      Cookie: `token=${token}`, // Send cookies explicitly
    },
  });

  return data.user;
};

const UserPage = async () => {
  const user = await fetchUserProfile();
  if (!user?.email) {
    redirect("/login");
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-6">
        <p className="text-gray-600">Name: {user.name}</p>
        <p className="text-gray-600">Email: {user.email}</p>
      </div>
      <LogoutButton />
    </>
  );
};

export default UserPage;
