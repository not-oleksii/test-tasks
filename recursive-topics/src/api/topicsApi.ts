import { topics, type Topic } from "./topics";

export const fetchTopics = async (): Promise<Topic[]> => {
  const response: Promise<Topic[]> = new Promise((resolve) => resolve(topics));

  // Simulate network delay
  new Promise((resolve) => resolve(setTimeout(() => {}, 1000)));

  return response.then((data) => data);
};
