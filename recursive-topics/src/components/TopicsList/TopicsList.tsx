import { TopicItem } from "./TopicItem/TopicItem";
import type { TopicsListProps } from "./types";

export const TopicsList = ({ topics }: TopicsListProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {topics.map((topic) => (
        <TopicItem key={topic.title} topic={topic} />
      ))}
    </div>
  );
};
