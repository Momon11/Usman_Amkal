"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  IconKey,
  IconLogout,
  IconUser,
  IconLayoutDashboard,
  IconPencil,
  IconTrash,
  IconEdit,
  IconNews,
  IconUsersGroup,
} from "@tabler/icons-react";
import { supabase } from "@/lib/supabaseClient";

export default function RolesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const { data, error } = await supabase.from("roles").select("*");
    if (!error && data) setRoles(data);
  };

  const filteredRoles = roles.filter((role) =>
    role.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus hak akses ini?")) {
      await supabase.from("roles").delete().eq("id", id);
      fetchRoles();
    }
  };

  const handleEdit = async (id, oldName) => {
    const newName = prompt("Edit nama hak akses:", oldName);
    if (newName && newName !== oldName) {
      await supabase.from("roles").update({ name: newName }).eq("id", id);
      fetchRoles();
    }
  };

  const handleAdd = async () => {
    const name = prompt("Masukkan nama hak akses:");
    if (name) {
      await supabase.from("roles").insert([{ name }]);
      fetchRoles();
    }
  };

  return (
    <div className="flex min-h-screen">
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
            className="text-white bg-black w-[150px] p-1 rounded-lg flex gap-2 items-center"
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

      <div className="bg-white w-full p-5 relative">
        <Input
          placeholder="Cari hak akses"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />

        <div className="flex flex-col gap-2">
          {/* Header Table */}
          <div className="grid grid-cols-3 font-bold px-3 py-2 border-b">
            <div>No</div>
            <div>Hak Akses</div>
            <div>Action</div>
          </div>

          {/* Data Rows */}
          {filteredRoles.map((role, index) => (
            <div
              key={role.id}
              className="grid grid-cols-3 items-center px-3 py-2 border rounded-lg"
            >
              <div>{index + 1}</div>
              <div>{role.name}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(role.id, role.name)}>
                  <IconPencil size={16} />
                </button>
                <button onClick={() => handleDelete(role.id)}>
                  <IconTrash size={16} />
                </button>
              </div>
            </div>
          ))}

          {filteredRoles.length === 0 && (
            <p className="text-gray-500 text-center">
              Hak akses tidak ditemukan.
            </p>
          )}
        </div>

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
