export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface StoryItem {
  id: string;
  mediaUrl: string;
  type: "image" | "video";
  duration: number; 
}

export interface Story {
  user: User;
  items: StoryItem[];
  createdAt: string;
}

export const stories: Story[] = [
  // ---------------- USER 1 ----------------
  {
    user: {
      id: "u1",
      name: "Your Story",
      avatar: "/profile.jpg",
    },
    items: [
      { id: "u1s1", mediaUrl: "/story1.jpg", type: "image", duration: 5000 },
      { id: "u1s2", mediaUrl: "/story2.jpg", type: "image", duration: 5000 },
      { id: "u1s3", mediaUrl: "/story3.jpg", type: "image", duration: 5000 },
    ],
    createdAt: new Date().toISOString(),
  },

  // ---------------- USER 2 ----------------
  {
    user: {
      id: "u2",
      name: "Rahul",
      avatar: "/rahul.jpg",
    },
    items: [
      { id: "u2s1", mediaUrl: "/rahul1.jpg", type: "image", duration: 5000 },
      { id: "u2s2", mediaUrl: "/rahul2.jpg", type: "image", duration: 5000 },
    ],
    createdAt: new Date().toISOString(),
  },

  // ---------------- USER 3 ----------------
  {
    user: {
      id: "u3",
      name: "Sneha",
      avatar: "/sneha.jpg",
    },
    items: [
      { id: "u3s1", mediaUrl: "/sneha1.jpg", type: "image", duration: 5000 },
      { id: "u3s2", mediaUrl: "/sneha2.jpg", type: "image", duration: 5000 },

    ],
    createdAt: new Date().toISOString(),
  },
];
