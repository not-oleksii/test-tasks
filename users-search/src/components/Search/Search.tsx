import { useCallback } from "react";
import type { SearchProps } from "./types";

export const Search = ({ onSearch, searchTerm }: SearchProps) => {
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    [onSearch],
  );

  const handleClear = useCallback(() => {
    onSearch("");
  }, [onSearch]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <input
        style={{ width: "100%", height: "30px", fontSize: "12px" }}
        type="text"
        placeholder="Search by name or email"
        onChange={handleSearch}
        value={searchTerm}
      />
      <button
        style={{ width: "100px", height: "100%", fontSize: "12px" }}
        onClick={handleClear}
      >
        Clear
      </button>
    </div>
  );
};
