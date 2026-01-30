import { useCallback, useEffect, useState } from "react";
import { fetchGigs } from "../../backend/api";
import type { Gig } from "../../backend/types";
export const GigsList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [gigs, setGigs] = useState<Gig[]>([]);

  const getGigs = useCallback(async () => {
    try {
      const gigs = await fetchGigs();

      return gigs;
    } catch (error) {
      console.error(error);

      return [];
    }
  }, []);

  useEffect(() => {
    getGigs().then((gigs) => {
      setGigs(gigs);
      setLoading(false);
    });
  }, [getGigs]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {gigs.map((gig) => (
        <div key={gig.id} className="bg-gray-500 p-4 rounded-md">
          <div className="flex items-center gap-2 bg-gray-600 p-2 rounded-md">
            <img
              src={gig.author.avatar}
              alt={gig.author.name}
              className="w-10 h-10 rounded-full"
            />
            <p>{gig.author.name}</p>
          </div>
          <h3>{gig.title}</h3>
          <img src={gig.image} alt={gig.title} />
          <p>{gig.rating}</p>
          <p>{gig.price}</p>
          <p>{gig.category}</p>
        </div>
      ))}
    </div>
  );
};
