"use client";

import { useRouter } from "next/navigation";
import {
  IconLayoutDashboard,
  IconUser,
  IconKey,
  IconLogout,
  IconEdit,
  IconNews,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: users } = await supabase.from("users").select("*");
    setUserCount(users.length);
    setAdminCount(users.filter((u) => u.roles?.includes("Admin")).length);
    setEmployeeCount(users.filter((u) => u.roles?.includes("Employee")).length);
  };

  return (
    <div className="flex min-h-screen">
      <div className="bg-white w-[250px] flex flex-col items-center gap-8 p-5">
        <h1 className="text-3xl text-black font-bold">Connect</h1>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-white bg-black w-[150px] p-1 rounded-lg flex gap-2 items-center"
          >
            <IconLayoutDashboard /> Dashboard
          </button>
          <button
            onClick={() => router.push("/users")}
            className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center"
          >
            <IconUser /> User
          </button>
          <button
            onClick={() => router.push("/editss")}
            className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center"
          >
            <IconEdit /> Edit
          </button>
          <button
            onClick={() => router.push("/roles")}
            className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center"
          >
            <IconKey /> Hak Akses
          </button>
          <button
            onClick={() => router.push("/news")}
            className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center"
          >
            <IconNews /> News
          </button>
          <button
            onClick={() => router.push("/team")}
            className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center"
          >
            <IconUsersGroup /> Tim
          </button>
          <button
            onClick={() => router.push("/login")}
            className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center"
          >
            <IconLogout /> Logout
          </button>
        </div>
      </div>

      <div className="bg-white w-full p-10">
        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-black text-white p-5 rounded-xl shadow-lg">
            <h3 className="text-lg">Total Users</h3>
            <p className="text-3xl font-bold">{userCount}</p>
          </div>
          <div className="bg-black text-white p-5 rounded-xl shadow-lg">
            <h3 className="text-lg">Admin</h3>
            <p className="text-3xl font-bold">{adminCount}</p>
          </div>
          <div className="bg-black text-white p-5 rounded-xl shadow-lg">
            <h3 className="text-lg">Employee</h3>
            <p className="text-3xl font-bold">{employeeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
