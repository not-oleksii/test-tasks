import { useCallback } from "react";
import type { SearchBarProps } from "./types";

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    [onSearch],
  );

  return (
    <div className="flex items-center gap-2">
      <input
        className="w-full p-2 rounded-md bg-blue-500/20 text-white"
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
};
