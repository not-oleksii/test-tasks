import { UsersList } from "./UsersList/UsersList";
import { Search } from "./Search/Search";
import { useUsers } from "../hooks/useUsers";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export const Main = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, error, loading] = useUsers();
  const [debouncedSearchTerm, debouncedLoading] = useDebounce(searchTerm);

  const handleSearch = useCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, []);

  const filteredUsers = useMemo(
    () =>
      users.filter(({ name, email }) => {
        if (name.toLowerCase().includes(debouncedSearchTerm)) {
          return true;
        }

        if (email.toLowerCase().includes(debouncedSearchTerm)) {
          return true;
        }
      }),
    [debouncedSearchTerm, users],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "24px",
        height: "100vh",
      }}
    >
      <Search onSearch={handleSearch} searchTerm={searchTerm} />
      <UsersList
        users={filteredUsers}
        error={error}
        loading={loading || debouncedLoading}
      />
    </div>
  );
};
