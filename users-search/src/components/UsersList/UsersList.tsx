import { useUsers } from "../../hooks/useUsers";
import { UserDetails } from "./UserDetailsModal/UserDetailsModal";
import { useCallback, useState } from "react";
import type { User } from "../../api/types";
import type { UsersListProps } from "./types";

export const UsersList = ({ users, error, loading }: UsersListProps) => {
  const [selectedUserId, setSelectedUserId] = useState<User["id"] | null>(null);

  const onClose = useCallback(() => {
    setSelectedUserId(null);
  }, []);

  const onViewClick = useCallback((userId: number) => {
    setSelectedUserId(userId);
  }, []);

  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: "#333",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                backgroundColor: "#444",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              {user.name}
            </h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.website}</p>
            <button onClick={onViewClick.bind(null, user.id)}>View</button>
          </div>
        ))}
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
        {users.length === 0 && <p>No users found</p>}
      </div>
      <UserDetails userId={selectedUserId} onClose={onClose} />
    </div>
  );
};
