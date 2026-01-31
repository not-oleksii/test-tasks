import { useMemo, useState } from "react";
import type { FilterBarProps } from "./types";

export const FilterBar = ({
  gigs,
  onCategorySelect,
  onPriceSelect,
}: FilterBarProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const categories = useMemo(() => {
    return [...new Set(gigs.map((gig) => gig.category))];
  }, [gigs]);

  const handleCategoryClick = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelectedCategories);
    onCategorySelect(newSelectedCategories);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setMinPrice(value);
    onPriceSelect(value, maxPrice);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setMaxPrice(value);
    onPriceSelect(minPrice, value);
  };

  return (
    <div className="w-1/4 h-screen bg-gray-500">
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        {categories.map((category) => (
          <div key={category} className="flex justify-start items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryClick(category)}
              id={category}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-2xl font-bold">Price</h2>
        <div className="flex items-center gap-2">
          <input
            className="w-1/2"
            type="number"
            onChange={handleMinPriceChange}
            value={minPrice}
            id="minPrice"
            placeholder="Min $"
          />
          <span>to</span>
          <input
            className="w-1/2"
            type="number"
            onChange={handleMaxPriceChange}
            value={maxPrice}
            id="maxPrice"
            placeholder="Max $"
          />
        </div>
      </div>
    </div>
  );
};
