import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminUserPage = () => {

  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsers(response.data);
          setLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [loaded]);

  // 🔒 Block / Unblock user
  const toggleBlockUser = async (email) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/users/block-toggle",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoaded(false); // reload users
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center px-6 py-10 bg-primary text-secondary">

      <div className="w-full max-w-7xl bg-white shadow-xl rounded-2xl overflow-hidden border border-neutral-200">

        {/* Header */}
        <div className="p-5 bg-secondary">
          <h1 className="text-2xl font-semibold text-accent">
            User Management
          </h1>
        </div>

        {/* Table */}
        <div className="overflow-auto max-h-[75vh]">
          {loaded ? (
            <table className="w-full border-collapse">
              <thead className="bg-accent text-secondary sticky top-0 shadow">
                <tr>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">First Name</th>
                  <th className="p-4 text-left">Last Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Email Verified</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-primary transition border-b border-neutral-200"
                  >
                    <td className="p-4">
                      <img
                        src={user.image || "/default.jpg"}
                        alt="user"
                        className="w-[40px] h-[40px] rounded-full object-cover shadow"
                      />
                    </td>

                    <td className="p-4 font-medium">{user.firstName}</td>
                    <td className="p-4">{user.lastName}</td>
                    <td className="p-4">{user.email}</td>

                    <td className="p-4 font-semibold capitalize">
                      {user.role}
                    </td>

                    {/* ✅ Email Verified Icon */}
                    <td className="p-4">
                      {user.isEmailVerified ? (
                        <FaCheckCircle className="text-green-600 text-xl" />
                      ) : (
                        <FaTimesCircle className="text-red-600 text-xl" />
                      )}
                    </td>

                    {/* 🔓 Status */}
                    <td
                      className={`p-4 font-semibold ${
                        user.isBlocked
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </td>

                   {/* 🔘 Block / Unblock Button */}
<td className="p-4">
  <button
    className="px-3 py-1 bg-secondary text-accent rounded-lg"
    onClick={async () => {
      try {
        await axios.put(
          import.meta.env.VITE_BACKEND_URL + `/users/toggle-block/${user.email}`,
          {
            isBlocked: !user.isBlocked,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setLoaded(false); // reload users
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    }}
  >
    {user.isBlocked ? "Unblock User" : "Block User"}
  </button>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;
