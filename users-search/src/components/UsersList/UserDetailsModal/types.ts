import type { User } from "../../../api/types";

export interface UserDetailsModalProps {
  userId: User["id"] | null;
  onClose: () => void;
}
