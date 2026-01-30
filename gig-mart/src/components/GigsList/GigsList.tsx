import { useMemo } from "react";
import type { GigsListProps } from "./types";
import { Gig } from "./Gig/Gig";

export const GigsList = ({
  error,
  searchTerm,
  debouncedLoading,
  gigs,
  loading,
}: GigsListProps) => {
  const filteredGigs = useMemo(() => {
    return gigs.filter((gig) =>
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [gigs, searchTerm]);
  const listToRender = useMemo(() => {
    return searchTerm.length > 0 ? filteredGigs : gigs;
  }, [filteredGigs, gigs, searchTerm.length]);

  if (loading || debouncedLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (listToRender.length === 0) {
    return <div>No gigs found</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {listToRender.map((gig) => (
        <Gig key={gig.id} gig={gig} />
      ))}
    </div>
  );
};
