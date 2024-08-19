"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  const { data, status } = useSession();
  console.log(data, status, "data, status from home page");
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") {
    redirect("/auth");
  }
  if (data?.user?.role === "unverified") {
    redirect("/auth/verify");
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-6">
      <h1 className="">Home Page</h1>
      <div>
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            signOut();
          }}
        >
          {" "}
          signOut
        </button>
      </div>
    </div>
  );
}
