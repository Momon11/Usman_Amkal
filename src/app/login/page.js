"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Data login langsung di file
  const dummyUsers = [
    { email: "admin@gmail.com", password: "12345" },
    { email: "user@example.com", password: "userpass" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const found = dummyUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (found) {
        router.push("/dashboard");
      } else {
        setError("Email atau password salah!");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md w-full max-w-sm p-6 rounded-lg border"
      >
        <h1 className="text-2xl font-bold text-center text-black mb-4">
          Connect With Us
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 mb-3 border rounded-lg text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 mb-3 border rounded-lg text-black"
        />

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
