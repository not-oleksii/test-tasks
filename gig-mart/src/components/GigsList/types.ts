import type { Gig } from "../../backend/types";

export interface GigsListProps {
  error: string;
  searchTerm: string;
  debouncedLoading: boolean;
  gigs: Gig[];
  loading: boolean;
}
