import { Input } from "@/components/ui/input";
import { IconKey, IconLogout, IconUser } from "@tabler/icons-react";

export default function Userpage() {
  return (
    <div id="container-user" className="flex min-h-screen">
      <div
        id="navigation"
        className="bg-white w-[250px] flex flex-col items-center gap-8 p-5"
      >
        <h1 className="text-3xl text-black font-bold">Connect</h1>
        <div className="flex flex-col gap-3">
          <button className="text-white bg-black w-[150px] p-1 rounded-lg flex gap-2">
            <IconUser />
            User
          </button>
          <button className="text-black w-[150px] p-1 rounded-lg flex gap-2">
            <IconKey />
            Hak Akses
          </button>
          <button className="text-black w-[150px] p-1 rounded-lg flex gap-2">
            <IconLogout />
            Logout
          </button>
        </div>
      </div>
      <div id="content" className="bg-white w-full p-5">
        <Input placeholder=" Cari User" />
        <div id="list-user" className="mt-5 flex flex-col gap-2">
          <div
            id="user-card"
            className="border p-3 rounded-lg flex justify-between items-center"
          >
            <div>
              <div>
                <p className="text-lg font-bold">Muhammad Usman Asrori</p>
                <p className="text-sm">usman123@gmail.com</p>
              </div>
              <div className="flex gap-2 mt-3">
                <p className="bg-black text-white px-2 py-1 text-sm rounded-lg">
                  Admin
                </p>
                <p className="bg-black text-white px-2 py-1 text-sm rounded-lg">
                  Employee
                </p>
              </div>
            </div>
            <p>Aktif</p>
          </div>

          <div
            id="user-card"
            className="border p-3 rounded-lg flex justify-between items-center"
          >
            <div>
              <div>
                <p className="text-lg font-bold">Muhammad Usman Asrori</p>
                <p className="text-sm">usman123@gmail.com</p>
              </div>
              <div className="flex gap-2 mt-3">
                <p className="bg-black text-white px-2 py-1 text-sm rounded-lg">
                  Admin
                </p>
                <p className="bg-black text-white px-2 py-1 text-sm rounded-lg">
                  Employee
                </p>
              </div>
            </div>
            <p>Aktif</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
