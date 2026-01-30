import type { Gig } from "../../backend/types";

export interface FilterBarProps {
  gigs: Gig[];
  onCategorySelect: (categories: string[]) => void;
  onPriceSelect: (minPrice: number, maxPrice: number) => void;
}
