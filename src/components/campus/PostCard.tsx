import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreHorizontal, CheckCircle2, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

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

interface PostCardProps {
  post: Post;
}

const categoryConfig: Record<string, { label: string; icon: string; color: string }> = {
  lost: { label: "Lost", icon: "🔍", color: "bg-amber-100 text-amber-700 border-amber-200" },
  found: { label: "Found", icon: "✅", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  confession: { label: "Confession", icon: "😶", color: "bg-purple-100 text-purple-700 border-purple-200" },
  event: { label: "Event", icon: "📅", color: "bg-blue-100 text-blue-700 border-blue-200" },
  club: { label: "Club", icon: "🎭", color: "bg-pink-100 text-pink-700 border-pink-200" },
  recruitment: { label: "Recruiting", icon: "👋", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  general: { label: "General", icon: "💬", color: "bg-secondary text-secondary-foreground border-border" },
};

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count);

  const config = categoryConfig[post.category] || categoryConfig.general;
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <motion.article 
      className="card-base group"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
            post.is_anonymous 
              ? "bg-muted text-muted-foreground" 
              : "bg-sakura-light text-sakura-dark"
          }`}>
            {post.is_anonymous ? "🎭" : post.author_name.charAt(0)}
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">
                {post.author_name}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${config.color}`}>
                {config.icon} {config.label}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
          </div>
        </div>

        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <p className="text-foreground/90 leading-relaxed mb-4 whitespace-pre-wrap">
        {post.content}
      </p>

      {/* AI Tags */}
      {post.ai_tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.ai_tags.map((tag) => (
            <span 
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-sakura-light/50 text-sakura-dark"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Resolved Status for Lost & Found */}
      {(post.category === "lost" || post.category === "found") && post.is_resolved && (
        <div className="flex items-center gap-2 text-emerald-600 text-sm mb-4 bg-emerald-50 px-3 py-2 rounded-lg">
          <CheckCircle2 className="w-4 h-4" />
          <span>This item has been resolved</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 pt-3 border-t border-border/50">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLike}
          className={`gap-1.5 ${liked ? "text-sakura" : "text-muted-foreground"}`}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-sakura" : ""}`} />
          <span className="text-xs">{likesCount}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs">{post.comments_count}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground ml-auto">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.article>
  );
};

export default PostCard;
