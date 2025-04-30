"use client";

import axios from "axios";
import { useState, FormEvent } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users", { name, email });
      console.log("User created:", response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="max-w-3xl mx-auto p-4 bg-neutral-800 rounded-2xl text-white">
        <h2 className="text-3xl font-bold mb-4">Create User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-semibold block">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold block">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none text-black"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="p-3 w-full bg-purple-800 rounded-md hover:bg-purple-200 hover:text-black duration-300"
            >
              Create New User
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
