import { useState, useEffect } from "react";
import { User } from "@/types"; // Update this import
import {
  getUsers,
  toggleAdminStatus,
  toggleUserStatus,
} from "@/app/adminActions";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggleAdminStatus(userId: string) {
    try {
      await toggleAdminStatus(userId);
      await fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  }

  async function handleToggleUserStatus(userId: string) {
    try {
      await toggleUserStatus(userId);
      await fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  }

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>{user.disabled ? "Disabled" : "Active"}</td>
              <td>
                <button
                  onClick={() => handleToggleAdminStatus(user.id)}
                  className="mr-2"
                >
                  {user.isAdmin ? "Remove Admin" : "Make Admin"}
                </button>
                <button onClick={() => handleToggleUserStatus(user.id)}>
                  {user.disabled ? "Enable" : "Disable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
