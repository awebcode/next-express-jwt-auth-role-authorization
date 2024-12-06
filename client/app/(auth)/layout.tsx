import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=" bg-gray-200  w-screen mb-4">
        {" "}
        <div className="container mx-auto p-4  flex gap-4 items-center">
          <Link href="/">Home</Link>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
          <Link href="/user">user</Link>
          <Link href="/admin">admin</Link>
        </div>
      </div>

      {children}
    </>
  );
}
