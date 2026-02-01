import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "../api/types";
import { fetchUserDetails } from "../api/users";

type UserDetailsHook = [User | null, string | null, boolean, () => void];

export const useUserDetails = (userId: User["id"] | null): UserDetailsHook => {
  const cacheRef = useRef<Map<User["id"], User>>(new Map());
  const abortRef = useRef<AbortController | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const load = useCallback(
    async (opts?: { force?: boolean }) => {
      if (!userId) {
        return;
      }

      const cached = cacheRef.current.get(userId);
      if (cached && !opts?.force) {
        setUser(cached);
        setError(null);
        setLoading(false);
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();

      abortRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchUserDetails(userId, controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        cacheRef.current.set(userId, data);
        setUser(data);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setError("Failed to fetch user details. Please try again later.");
        console.error(error);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [userId],
  );

  useEffect(() => {
    load();

    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  const refetch = useCallback(() => {
    load({ force: true });
  }, [load]);

  return [user, error, loading, refetch];
};
