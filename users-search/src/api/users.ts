import type { User } from "./types";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
};

export const fetchUserDetails = async (
  userId: User["id"],
  signal: AbortSignal,
): Promise<User> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user details: ${response.status}`);
  }

  const data = await response.json();

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
};
