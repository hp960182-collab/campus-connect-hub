import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SakuraParticles from "@/components/SakuraParticles";
import { X } from "lucide-react";

const galleryImages = [
  { id: 1, title: "Community Meetup", category: "Events" },
  { id: 2, title: "Workshop Session", category: "Learning" },
  { id: 3, title: "Team Building", category: "Events" },
  { id: 4, title: "Project Showcase", category: "Projects" },
  { id: 5, title: "Hackathon 2024", category: "Events" },
  { id: 6, title: "Study Group", category: "Learning" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SakuraParticles />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-sakura-dark text-xs tracking-[0.3em] uppercase mb-4">
              Memories
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Gallery
            </h1>
            <p className="text-foreground/60 max-w-md mx-auto">
              Moments captured from our events, workshops, and gatherings.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setSelectedImage(image.id)}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-sakura/10 to-accent/10 overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white/70 text-xs uppercase tracking-wider mb-1">{image.category}</p>
                    <h3 className="text-white font-display text-lg">{image.title}</h3>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-foreground/30 text-sm">Coming Soon</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center text-foreground/50 mt-12 text-sm"
          >
            More photos coming soon as we grow together.
          </motion.p>
        </div>
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground/50 hover:text-sakura-dark transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full aspect-video bg-card rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-foreground/40">Image Preview Coming Soon</span>
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
