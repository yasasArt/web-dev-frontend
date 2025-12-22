import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!loaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUsers(res.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          setLoaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen bg-primary px-6 py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 bg-secondary flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-accent">
            Users Management
          </h1>
          <span className="text-sm text-secondary/70">
            Total Users: {users.length}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[75vh]">
          {!loaded ? (
            <div className="py-20 flex justify-center">
              <Loader />
            </div>
          ) : users.length === 0 ? (
            <div className="py-20 text-center text-secondary/70">
              No users found
            </div>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-accent text-secondary shadow">
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">First Name</th>
                  <th className="px-4 py-3 text-left">Last Name</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-neutral-200 hover:bg-primary transition"
                  >
                    {/* Image */}
                    <td className="px-4 py-3">
                      <img
                        src={user.image || "/default-avatar.png"}
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 font-medium">
                      {user.email}
                    </td>

                    {/* First Name */}
                    <td className="px-4 py-3">
                      {user.firstName}
                    </td>

                    {/* Last Name */}
                    <td className="px-4 py-3">
                      {user.lastName}
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            user.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;
