import { useCallback, useEffect, useState } from "react";
import { GigsList } from "./GigsList/GigsList";
import { SearchBar } from "./SearchBar/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import { FilterBar } from "./FilterBar/FilterBar";
import type { Gig } from "../backend/types";
import { fetchGigs } from "../backend/api";

export const Main = () => {
  const [search, setSearch] = useState<string>("");
  const [searchTerm, debouncedLoading] = useDebounce(search);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredGigs, setFilteredGigs] = useState<Gig[]>([]);
  const [error, setError] = useState<string>("");

  const handleSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  const getGigs = useCallback(async () => {
    try {
      const gigs = await fetchGigs();

      return gigs;
    } catch (error) {
      setError("Failed to fetch gigs. Please try again later.");

      console.error(error);

      return [];
    }
  }, []);

  const onCategorySelect = useCallback(
    (categories: string[]) => {
      const gigsToFilter = filteredGigs.length > 0 ? filteredGigs : gigs;

      const filteredGigsByCategory = gigsToFilter.filter((gig) =>
        categories.includes(gig.category),
      );

      setFilteredGigs(filteredGigsByCategory);
    },
    [gigs, filteredGigs],
  );

  const onPriceSelect = useCallback(
    (minPrice: number, maxPrice: number) => {
      if (
        minPrice > maxPrice ||
        maxPrice < minPrice ||
        minPrice < 0 ||
        maxPrice < 0
      ) {
        return;
      }

      const gigsToFilter = filteredGigs.length > 0 ? filteredGigs : gigs;

      const filteredGigsByPrice = gigsToFilter.filter(
        (gig) => gig.price >= minPrice && gig.price <= maxPrice,
      );

      setFilteredGigs(filteredGigsByPrice);
    },
    [gigs, filteredGigs],
  );

  useEffect(() => {
    getGigs().then((gigs) => {
      setGigs(gigs);
      setLoading(false);
    });
  }, [getGigs]);

  return (
    <div className="flex gap-4">
      <FilterBar
        gigs={gigs}
        onCategorySelect={onCategorySelect}
        onPriceSelect={onPriceSelect}
      />
      <div className="h-screen w-5xl flex flex-col justify-start items-center gap-4">
        <SearchBar onSearch={handleSearch} />
        <GigsList
          error={error}
          searchTerm={searchTerm}
          gigs={filteredGigs.length > 0 ? filteredGigs : gigs}
          loading={loading}
          debouncedLoading={debouncedLoading}
        />
      </div>
    </div>
  );
};
