import { useCallback, useEffect, useState } from "react";
import type { User } from "../api/types";
import { fetchUserDetails } from "../api/users";

type UserDetailsHook = [User | null, string, boolean];

export const useUserDetails = (userId: User["id"] | null): UserDetailsHook => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getUserDetails = useCallback(async () => {
    if (!userId) {
      return;
    }

    try {
      setLoading(true);
      const user = await fetchUserDetails(userId);
      setUser(user);
    } catch (error) {
      setError("Failed to fetch user details. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return [user, error, loading];
};
