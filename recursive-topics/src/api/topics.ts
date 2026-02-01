export type Topic = {
  title: string;
  enabled: boolean;
  subtopics: Topic[];
};

// topics.js
export const topics: Topic[] = [
  {
    title: "Physics",
    enabled: true,
    subtopics: [
      {
        title: "Classical mechanics",
        enabled: true,
        subtopics: [
          {
            title: "Newton's laws",
            enabled: true,
            subtopics: [],
          },
          {
            title: "Work and energy",
            enabled: true,
            subtopics: [],
          },
          {
            title: "Rotational motion",
            enabled: false,
            subtopics: [],
          },
        ],
      },
      {
        title: "Electromagnetism",
        enabled: true,
        subtopics: [
          {
            title: "Electric fields",
            enabled: true,
            subtopics: [],
          },
          {
            title: "Magnetism",
            enabled: false,
            subtopics: [],
          },
        ],
      },
      {
        title: "Quantum mechanics",
        enabled: false,
        subtopics: [
          {
            title: "Wave–particle duality",
            enabled: false,
            subtopics: [],
          },
        ],
      },
    ],
  },

  {
    title: "Mathematics",
    enabled: true,
    subtopics: [
      {
        title: "Algebra",
        enabled: true,
        subtopics: [
          { title: "Linear algebra", enabled: true, subtopics: [] },
          { title: "Abstract algebra", enabled: false, subtopics: [] },
        ],
      },
      {
        title: "Calculus",
        enabled: true,
        subtopics: [
          { title: "Differential calculus", enabled: true, subtopics: [] },
          { title: "Integral calculus", enabled: true, subtopics: [] },
        ],
      },
    ],
  },

  {
    title: "Programming",
    enabled: false,
    subtopics: [
      {
        title: "Frontend",
        enabled: true,
        subtopics: [
          {
            title: "React",
            enabled: true,
            subtopics: [
              {
                title: "TypeScript",
                enabled: true,
                subtopics: [{ title: "JS", enabled: true, subtopics: [] }],
              },
            ],
          },
        ],
      },
      {
        title: "Backend",
        enabled: false,
        subtopics: [
          { title: "Node.js", enabled: true, subtopics: [] },
          { title: "Databases", enabled: false, subtopics: [] },
        ],
      },
    ],
  },
];
