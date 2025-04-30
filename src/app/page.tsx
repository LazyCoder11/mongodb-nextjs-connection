"use client";

import axios from "axios";
import { useState, FormEvent, useEffect } from "react";

interface User {
  _id: string;
  name?: string;
  email: string;
}

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users", { name, email });
      console.log("User created:", response.data);
      setName("");
      setEmail("");
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // const handleDelete = async (id: string) => {
  //   try {
  //     await axios.delete(`/api/users/${id}`);
  //     fetchUsers(); // Refresh user list
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  // const confirmDelete = (id: string) => {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //     handleDelete(id);
  //   }
  // };

  return (
    <section className="min-h-screen space-y-5 pt-10">
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
      <div className="w-full max-w-3xl mx-auto p-4 bg-neutral-800 rounded-2xl text-white">
        <h3 className="text-2xl font-semibold mb-4">All Users</h3>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user._id}
                className="border-b flex justify-between border-gray-600 pb-2"
              >
                <strong>{user.name || "No Name"}</strong> {user.email}
                {/* <button
                  onClick={() => confirmDelete(user._id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
