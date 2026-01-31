import type { User } from "../../api/types";

export interface UsersListProps {
  users: User[];
  error: string;
  loading: boolean;
}
