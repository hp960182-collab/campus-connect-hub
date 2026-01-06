import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "./PostCard";
import type { CategoryFilter } from "@/pages/CampusLoop";

interface Post {
  id: string;
  content: string;
  category: string;
  ai_tags: string[];
  is_anonymous: boolean;
  author_name: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  is_resolved?: boolean;
}

// Demo posts for MVP
const DEMO_POSTS: Post[] = [
  {
    id: "1",
    content: "Lost my MacBook charger near the library entrance. It's a white 67W USB-C charger. Please DM if found! 🙏",
    category: "lost",
    ai_tags: ["charger", "library", "urgent"],
    is_anonymous: false,
    author_name: "Aryan K.",
    created_at: "2025-01-06T10:30:00Z",
    likes_count: 12,
    comments_count: 3,
  },
  {
    id: "2",
    content: "The way my crush looked at me in the cafeteria today... I'm 100% sure they hate me now 😭",
    category: "confession",
    ai_tags: ["crush", "feelings"],
    is_anonymous: true,
    author_name: "Anonymous",
    created_at: "2025-01-06T09:45:00Z",
    likes_count: 89,
    comments_count: 24,
  },
  {
    id: "3",
    content: "🎉 HACKATHON ALERT! DevFest 2025 happening this weekend at Main Auditorium. 48 hours of coding, prizes worth 50k! Register now: bit.ly/devfest25",
    category: "event",
    ai_tags: ["hackathon", "coding", "prizes", "weekend"],
    is_anonymous: false,
    author_name: "Tech Club",
    created_at: "2025-01-06T08:00:00Z",
    likes_count: 156,
    comments_count: 42,
  },
  {
    id: "4",
    content: "Found a pair of AirPods Pro near Block C parking. Case has a small sticker on it. Come to Room 204 with proof of ownership to claim.",
    category: "found",
    ai_tags: ["airpods", "parking", "found"],
    is_anonymous: false,
    author_name: "Priya S.",
    created_at: "2025-01-06T07:20:00Z",
    likes_count: 34,
    comments_count: 8,
    is_resolved: false,
  },
  {
    id: "5",
    content: "Dance Club auditions next week! All styles welcome - hip hop, classical, contemporary. No experience needed, just passion! 💃🕺",
    category: "club",
    ai_tags: ["dance", "auditions", "recruitment"],
    is_anonymous: false,
    author_name: "Dance Club",
    created_at: "2025-01-05T18:00:00Z",
    likes_count: 67,
    comments_count: 15,
  },
  {
    id: "6",
    content: "Can someone explain why the hostel wifi goes down exactly when assignments are due? Every. Single. Time. 💀",
    category: "general",
    ai_tags: ["wifi", "hostel", "rant"],
    is_anonymous: true,
    author_name: "Anonymous",
    created_at: "2025-01-05T23:45:00Z",
    likes_count: 234,
    comments_count: 56,
  },
  {
    id: "7",
    content: "Photography Club is organizing a campus photowalk this Saturday 6AM. Golden hour shots guaranteed! Meet at Main Gate. 📸",
    category: "event",
    ai_tags: ["photography", "photowalk", "weekend"],
    is_anonymous: false,
    author_name: "Photo Club",
    created_at: "2025-01-05T14:30:00Z",
    likes_count: 45,
    comments_count: 12,
  },
  {
    id: "8",
    content: "I've been eating alone in the cafeteria for 2 semesters now. Today someone asked if they could sit with me. Small things matter. ❤️",
    category: "confession",
    ai_tags: ["wholesome", "friendship"],
    is_anonymous: true,
    author_name: "Anonymous",
    created_at: "2025-01-05T13:00:00Z",
    likes_count: 456,
    comments_count: 89,
  },
];

interface PostFeedProps {
  filter: CategoryFilter;
}

const PostFeed = ({ filter }: PostFeedProps) => {
  const [posts] = useState<Post[]>(DEMO_POSTS);

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    if (filter === "lost") return post.category === "lost" || post.category === "found";
    if (filter === "confession") return post.category === "confession" || post.is_anonymous;
    if (filter === "event") return post.category === "event";
    if (filter === "club") return post.category === "club" || post.category === "recruitment";
    return true;
  });

  const getEmptyMessage = () => {
    switch (filter) {
      case "lost": return "No lost or found items yet. Post if you've lost or found something!";
      case "confession": return "No confessions yet. Be the first to share anonymously!";
      case "event": return "No upcoming events. Know of one? Post it!";
      case "club": return "No club updates yet. Clubs, share your news!";
      default: return "No posts yet. Be the first to share something!";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <AnimatePresence mode="popLayout">
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">{getEmptyMessage()}</p>
          </motion.div>
        ) : (
          filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostFeed;
