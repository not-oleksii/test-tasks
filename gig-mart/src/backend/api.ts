import type { Gig } from "./types";

const MOCK_GIGS: Gig[] = Array.from({ length: 50 }, (_, i) => ({
  id: `gig_${i}`,
  title: `I will do ${["awesome", "amazing", "professional"][i % 3]} ${["design", "coding", "seo"][i % 3]} for your business ${i}`,
  author: {
    name: `Seller ${i}`,
    avatar: `https://i.pravatar.cc/150?u=${i}`,
  },
  rating: (Math.random() * (5.0 - 3.0) + 3.0).toFixed(1) as unknown as number, // 3.0 to 5.0
  price: Math.floor(Math.random() * 100) + 10, // 10 to 110
  category: i % 3 === 0 ? "Programming" : i % 3 === 1 ? "Design" : "Marketing",
  image: `https://picsum.photos/seed/${i}/300/200`,
}));

export const fetchGigs = (): Promise<Gig[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_GIGS);
    }, 500); // Emulate network delay
  });
};
