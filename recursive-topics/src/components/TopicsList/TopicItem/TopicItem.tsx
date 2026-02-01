import type { TopicItemProps } from "./types";
import "./topicStyles.css";
import { useCallback, useMemo, useState, type MouseEvent } from "react";

export const TopicItem = ({ topic, isSubtopic }: TopicItemProps) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const { enabled } = topic;
  const hasSubtopics = useMemo(
    () => topic.subtopics.length > 0,
    [topic.subtopics],
  );

  const onTopicClick = useCallback(
    (event: MouseEvent<HTMLUListElement>) => {
      event.stopPropagation();
      if (hasSubtopics && !isExpanded) {
        setExpanded(true);

        return;
      }

      setExpanded(false);
    },
    [hasSubtopics, isExpanded],
  );

  return (
    <ul
      className={` 
        ${hasSubtopics ? "clickable" : ""} 
        ${isSubtopic ? "subtopic" : ""}
        `}
      onClick={onTopicClick}
    >
      <div className={`topic_content ${enabled ? "active" : "inactive"}`}>
        {topic.title}
        {hasSubtopics && (
          <div className={"subtopic_counter"}>{topic.subtopics.length}</div>
        )}
      </div>
      {isExpanded &&
        topic.subtopics.map((topic) => (
          <li>
            <TopicItem key={topic.title} topic={topic} isSubtopic={true} />
          </li>
        ))}
    </ul>
  );
};
