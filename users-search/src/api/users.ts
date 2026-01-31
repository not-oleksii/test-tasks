import type { User } from "./types";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
};

export const fetchUserDetails = async (userId: User["id"]): Promise<User> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  const data = await response.json();

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
};
