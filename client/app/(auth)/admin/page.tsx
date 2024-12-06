"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchAdminData = async () => {
  const { data } = await axiosInstance.get("/admin", {
    withCredentials: true,
  });
  return data;
};

const AdminPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin"],
    queryFn: fetchAdminData,
  });

  // if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Access Denied or Failed to load admin data. {(error as any).response.data.message}
      </p>
    );

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-red-600">Admin Dashboard</h1>
      <p className="mb-4 text-gray-600">Welcome, {data?.user?.name}</p>
      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Admin Controls</h2>
        <ul className="list-disc list-inside">
          <li>View all users</li>
          <li>Manage roles</li>
          <li>Access logs</li>
        </ul>
      </div>
    </>
  );
};

export default AdminPage;
