import { useEffect, useState } from "react";
import { getUsers, updateUser } from "../api/usersApi";

function Users() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsersList(data);
    } catch (err) {
      console.error("Failed loading users:", err);
      setError("Failed to load users from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (user, newRole) => {
    try {
      setUpdatingId(user.id);
      await updateUser(user.id, { ...user, role: newRole });
      // Update state locally
      setUsersList((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error("Error updating user role:", err);
      alert("Failed to update user role.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-gray-600">
          Manage system users and access permissions.
        </p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-100 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl bg-white p-6 shadow">
        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {usersList.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "technician"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={user.role}
                      disabled={updatingId === user.id}
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm outline-none focus:border-violet-600"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="technician">Technician</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Users;