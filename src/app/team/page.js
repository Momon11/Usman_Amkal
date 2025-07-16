"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  IconUser,
  IconKey,
  IconLayoutDashboard,
  IconLogout,
  IconEdit,
  IconNews,
  IconUsersGroup,
} from "@tabler/icons-react";
import { supabase } from "@/lib/supabaseClient";

export default function TeamPage() {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetchTeams();
    fetchAllUsers();
  }, []);

  const fetchTeams = async () => {
    const { data, error } = await supabase.from("teams").select("*, users(*)");
    if (!error && data) setTeams(data);
  };

  const fetchAllUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (!error && data) setAllUsers(data);
  };

  const handleAddTeam = async () => {
    const name = prompt("Masukkan nama tim:");
    if (name) {
      const { error } = await supabase.from("teams").insert([{ name }]);
      if (!error) fetchTeams();
    }
  };

  const handleAssignUser = async () => {
    if (!selectedUser || !selectedTeam) {
      alert("Pilih user dan tim dulu bro!");
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({ team_id: parseInt(selectedTeam) })
      .eq("id", selectedUser);

    if (!error) {
      fetchTeams();
      alert("User berhasil dimasukkan ke tim!");
    } else {
      alert("Gagal assign user.");
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
            className="bg-black text-white w-[150px] p-1 rounded-lg flex gap-2 items-center"
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

      <div className="bg-white w-full p-5">
        <h2 className="text-xl font-bold mb-4">Daftar Tim</h2>
        <div className="flex flex-col gap-4">
          {teams.map((team) => (
            <div key={team.id} className="border rounded-md p-4">
              <p className="text-lg font-bold">{team.name}</p>
              <div className="mt-2">
                <p className="text-sm text-gray-700 mb-1">Anggota:</p>
                <ul className="list-disc list-inside">
                  {team.users?.length > 0 ? (
                    team.users.map((user) => (
                      <li key={user.id}>
                        {user.name} ({user.email})
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">Belum ada anggota</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-4">
          <h3 className="text-md font-semibold mb-2">Tambah User ke Tim</h3>
          <div className="flex gap-2 items-center">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">Pilih User</option>
              {allUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">Pilih Tim</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAssignUser}
              className="bg-black text-white px-3 py-1 rounded"
            >
              Tambahkan ke Tim
            </button>
          </div>
        </div>

        <button
          onClick={handleAddTeam}
          className="fixed bottom-5 right-5 bg-gray-200 hover:bg-gray-300 text-xl rounded-md w-10 h-10"
        >
          +
        </button>
      </div>
    </div>
  );
}
