import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AISearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_QUERIES = [
  "Any hackathons this week?",
  "Did anyone find AirPods?",
  "Which clubs do web dev?",
  "What events are happening today?",
];

const AISearchPanel = ({ isOpen, onClose }: AISearchPanelProps) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{
    answer: string;
    sources: string[];
  } | null>(null);

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    
    setQuery(searchQuery);
    setIsSearching(true);
    setResult(null);

    // Simulate AI search
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Demo responses
    const lowerQuery = searchQuery.toLowerCase();
    let answer = "";
    let sources: string[] = [];

    if (lowerQuery.includes("hackathon")) {
      answer = "🎉 Yes! DevFest 2025 is happening this weekend at the Main Auditorium. It's a 48-hour hackathon with prizes worth ₹50,000. Registration is still open at bit.ly/devfest25. The Tech Club is organizing it.";
      sources = ["Tech Club's post from today", "3 related posts about DevFest"];
    } else if (lowerQuery.includes("airpods") || lowerQuery.includes("found")) {
      answer = "✅ Found! Priya S. found a pair of AirPods Pro near Block C parking. The case has a small sticker on it. You can claim them at Room 204 with proof of ownership.";
      sources = ["Priya S.'s Found post", "Lost & Found section"];
    } else if (lowerQuery.includes("web dev") || lowerQuery.includes("clubs")) {
      answer = "💻 For web development, check out: Tech Club (hosts hackathons and workshops), Coding Club (weekly sessions), and the GDSC chapter (Google Developer Student Club). Dance Club auditions are also coming up if you're interested in other activities!";
      sources = ["Tech Club posts", "Club section posts", "5 related posts"];
    } else if (lowerQuery.includes("event") || lowerQuery.includes("today")) {
      answer = "📅 Upcoming events:\n\n1. DevFest 2025 - This weekend at Main Auditorium\n2. Photography Photowalk - Saturday 6AM at Main Gate\n3. Dance Club Auditions - Next week\n\nCheck the Events tab for more details!";
      sources = ["Events section", "4 event posts found"];
    } else {
      answer = "I searched through all campus posts but couldn't find specific information about that. Try browsing the relevant sections or post your question to the community!";
      sources = ["No specific matches found"];
    }

    setResult({ answer, sources });
    setIsSearching(false);
  };

  const handleClose = () => {
    setQuery("");
    setResult(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 md:inset-x-auto md:right-4 md:bottom-4 md:left-auto md:w-[420px] md:rounded-2xl bg-card rounded-t-2xl shadow-2xl z-50 max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-sakura-light/50 to-transparent">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sakura flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold">Campus AI</h2>
                  <p className="text-xs text-muted-foreground">Ask anything about campus</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Sample Queries */}
              {!result && !isSearching && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {SAMPLE_QUERIES.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSearch(q)}
                        className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-sakura-light hover:text-sakura-dark transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading */}
              {isSearching && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-sakura-light flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-sakura animate-spin" />
                  </div>
                  <p className="text-sm text-muted-foreground">Searching campus posts...</p>
                </motion.div>
              )}

              {/* Result */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Query */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] px-4 py-2 bg-sakura text-white rounded-2xl rounded-br-sm">
                      {query}
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-sakura-light flex-shrink-0 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-sakura" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="p-4 bg-secondary/50 rounded-2xl rounded-tl-sm">
                        <p className="text-sm whitespace-pre-wrap">{result.answer}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {result.sources.map((source, i) => (
                          <span key={i} className="text-xs text-muted-foreground">
                            📌 {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Search Input */}
            <div className="p-4 border-t border-border bg-secondary/20">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex gap-2"
              >
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything about campus..."
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={!query.trim() || isSearching}
                  className="btn-primary px-4"
                >
                  {isSearching ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AISearchPanel;
