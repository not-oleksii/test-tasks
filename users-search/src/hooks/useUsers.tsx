import { useCallback, useEffect, useState } from "react";
import type { User } from "../api/types";
import { fetchUsers } from "../api/users";

type UsersHook = [User[], string, boolean];

export const useUsers = (): UsersHook => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const users = await fetchUsers();

      setUsers(users);
    } catch (error) {
      setError("Failed to fetch users. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return [users, error, loading];
};
