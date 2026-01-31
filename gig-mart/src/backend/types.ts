export interface Gig {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string; // url or placeholder color
  };
  rating: number;
  price: number;
  category: "Programming" | "Design" | "Marketing";
  image: string; // url or placeholder color
}
