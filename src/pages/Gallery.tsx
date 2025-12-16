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
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-sakura-dark text-sm tracking-[0.2em] uppercase mb-4">
              Memories
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Gallery
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Moments captured from our events, workshops, and community gatherings.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedImage(image.id)}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-sakura/20 to-accent/30 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-background text-xs uppercase tracking-wider mb-1">{image.category}</p>
                    <h3 className="text-background font-display text-lg">{image.title}</h3>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground/50 text-sm">Coming Soon</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center text-muted-foreground mt-12"
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
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-sakura-dark transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full aspect-video bg-card rounded-2xl flex items-center justify-center">
            <span className="text-muted-foreground">Image Preview Coming Soon</span>
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
