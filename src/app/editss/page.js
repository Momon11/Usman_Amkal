"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconUser,
  IconEdit,
  IconKey,
  IconLogout,
  IconNews,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function EditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const userId = searchParams.get("id");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (!error && data) setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userId) {
      const user = users.find((u) => u.id === parseInt(userId));
      if (user) {
        setSelectedUser(user);
        setName(user.name);
        setEmail(user.email);
        setRole(user.roles);
        setStatus(user.status);
      }
    }
  }, [userId, users]);

  const handleUpdate = async () => {
    if (!selectedUser) {
      alert("User belum dipilih.");
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({ name, email, roles: role, status })
      .eq("id", selectedUser.id);

    if (error) {
      alert("Gagal memperbarui user");
    } else {
      alert("User berhasil diperbarui");
      fetchUsers();
      router.push("/editss");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  const isActive = (path) => pathname.includes(path);

  return (
    <div className="flex min-h-screen">
      <div className="bg-white w-[250px] flex flex-col items-center gap-8 p-5">
        <h1 className="text-3xl text-black font-bold">Connect</h1>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className={`w-[150px] p-1 rounded-lg flex gap-2 items-center ${
              isActive("/dashboard") ? "bg-black text-white" : "text-black"
            }`}
          >
            <IconLayoutDashboard /> Dashboard
          </button>
          <button
            onClick={() => router.push("/users")}
            className={`w-[150px] p-1 rounded-lg flex gap-2 items-center ${
              isActive("/users") ? "bg-black text-white" : "text-black"
            }`}
          >
            <IconUser /> User
          </button>
          <button
            onClick={() => router.push("/editss")}
            className={`w-[150px] p-1 rounded-lg flex gap-2 items-center ${
              isActive("/editss") ? "bg-black text-white" : "text-black"
            }`}
          >
            <IconEdit /> Edit
          </button>
          <button
            onClick={() => router.push("/roles")}
            className={`w-[150px] p-1 rounded-lg flex gap-2 items-center ${
              isActive("/roles") ? "bg-black text-white" : "text-black"
            }`}
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
            className="w-[150px] p-1 rounded-lg flex gap-2 items-center text-black"
          >
            <IconLogout /> Logout
          </button>
        </div>
      </div>

      <div className="bg-white w-full p-5">
        {!userId ? (
          <>
            <Input
              placeholder="Cari user"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />
            <div className="flex flex-col gap-2">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => router.push(`/editss?id=${user.id}`)}
                  className="border p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <p className="text-lg font-bold">{user.name}</p>
                  <p className="text-sm">{user.email}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-black text-white px-2 py-1 text-sm rounded-lg">
                      {user.roles}
                    </span>
                    <span className="text-sm">{user.status}</span>
                  </div>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <p className="text-gray-500 text-center">
                  User tidak ditemukan.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="flex flex-col gap-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <select
                value={role || ""} 
                onChange={(e) => setRole(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">-- Pilih Role --</option>
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
              </select>

              <select
                value={status || ""}
                onChange={(e) => setStatus(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">-- Pilih Status --</option>
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>

              <div className="flex gap-2">
                <Button onClick={handleUpdate}>Simpan</Button>
                <Button
                  variant="secondary"
                  onClick={() => router.push("/editss")}
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
