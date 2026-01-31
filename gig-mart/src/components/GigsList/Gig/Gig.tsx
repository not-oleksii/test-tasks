import { useState } from "react";
import type { GigProps } from "./types";
import { HeartIcon, StarIcon } from "lucide-react";

export const Gig = ({ gig }: GigProps) => {
  const { id, author, title, image, rating, price, category } = gig;
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    return localStorage.getItem(`favorite_${id}`) !== null;
  });

  const handleFavorite = () => {
    if (isFavorite) {
      localStorage.removeItem(`favorite_${id}`);
      setIsFavorite(false);

      return;
    }

    localStorage.setItem(`favorite_${id}`, JSON.stringify(gig));
    setIsFavorite(true);
  };

  return (
    <div
      key={id}
      className="bg-gray-500 p-4 rounded-md shadow-md flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-gray-600 p-2 rounded-md">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full"
          />
          <p>{author.name}</p>
        </div>
        <HeartIcon
          className="w-6 text-blue-700 cursor-pointer"
          fill={isFavorite ? "currentColor" : "none"}
          onClick={handleFavorite}
        />
      </div>
      <h3>{title}</h3>
      <img src={image} alt={title} />
      <div className="flex items-center gap-2">
        <p>{rating}</p>
        <StarIcon className="w-4 h-4 text-yellow-500" />
      </div>
      <p>Starting at ${price}</p>
      <p>{category}</p>
    </div>
  );
};
