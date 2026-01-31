import { useCallback } from "react";
import type { UserDetailsModalProps } from "./types";
import { useUserDetails } from "../../../hooks/useUserDetails";
import { createPortal } from "react-dom";

export const UserDetails = ({ userId, onClose }: UserDetailsModalProps) => {
  const [user, error, loading] = useUserDetails(userId);

  const onCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!userId) {
    return null;
  }

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          height: "50%",
          backgroundColor: "#333",
          zIndex: 1001,
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
        {!error && !loading && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>User Details</h3>{" "}
              <div
                onClick={onCloseClick}
                style={{
                  cursor: "pointer",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#444",
                  borderRadius: "5px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              >
                X
              </div>
            </div>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Phone: {user?.phone}</p>
            <p>Website: {user?.website}</p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};
