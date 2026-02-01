import { useCallback, useEffect, useState } from "react";
import type { Topic } from "../api/topics";
import { fetchTopics } from "../api/topicsApi";
import { TopicsList } from "./TopicsList/TopicsList";

export const Main = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getTopics = useCallback(async () => {
    try {
      setLoading(true);

      const data = await fetchTopics();
      setTopics(data);
    } catch (e) {
      setError("Something went wrong.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTopics();
  }, [getTopics]);

  return (
    <div>
      <TopicsList topics={topics} />
    </div>
  );
};
