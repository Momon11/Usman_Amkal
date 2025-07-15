"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  IconKey,
  IconLogout,
  IconUser,
  IconLayoutDashboard,
  IconEdit,
  IconNews,
} from "@tabler/icons-react";
import { supabase } from "@/lib/supabaseClient";

export default function UserPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (!error && data) setUsers(data);
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    const name = prompt("Masukkan nama:");
    const email = prompt("Masukkan email:");
    if (name && email) {
      const { error } = await supabase.from("users").insert([
        {
          name,
          email,
          roles: "Employee",
          status: "Aktif",
        },
      ]);
      if (!error) fetchUsers();
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-white w-[250px] flex flex-col items-center gap-8 p-5">
        <h1 className="text-3xl text-black font-bold">Connect</h1>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center"
          >
            <IconLayoutDashboard /> Dashboard
          </button>
          <button
            onClick={() => router.push("/users")}
            className="text-white bg-black w-[150px] p-1 rounded-lg flex gap-2 items-center"
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
                    <button onClick={() => router.push('/news')} className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center">
            <IconNews /> News
          </button>
          <button
            onClick={() => router.push("/login")}
            className="text-black w-[150px] p-1 rounded-lg flex gap-2 items-center"
          >
            <IconLogout /> Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white w-full p-5 relative">
        <Input
          placeholder="Cari user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />

        <div className="flex flex-col gap-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="border rounded-md p-4 flex justify-between items-start"
            >
              <div>
                <p className="text-lg font-bold">{user.name}</p>
                <p className="text-sm text-gray-700">{user.email}</p>

                <div className="flex gap-2 mt-2">
                  {Array.isArray(user.roles) ? (
                    user.roles.map((role) => (
                      <span
                        key={role}
                        className="bg-black text-white text-xs px-2 py-1 rounded"
                      >
                        {role}
                      </span>
                    ))
                  ) : user.roles ? (
                    <span className="bg-black text-white text-xs px-2 py-1 rounded">
                      {user.roles}
                    </span>
                  ) : null}
                </div>
              </div>

              <p className="font-semibold">{user.status}</p>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-gray-500 text-center">User tidak ditemukan.</p>
          )}
        </div>

        {/* Tombol Tambah */}
        <button
          onClick={handleAdd}
          className="fixed bottom-5 right-5 bg-gray-200 hover:bg-gray-300 text-xl rounded-md w-10 h-10"
        >
          +
        </button>
      </div>
    </div>
  );
}
