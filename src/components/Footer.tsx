import { Flower2 } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-background border-t border-border/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <Flower2 className="w-5 h-5 text-sakura" />
            <span className="font-display text-lg text-foreground">StudentConnect</span>
          </div>
          
          <p className="text-muted-foreground text-xs text-center max-w-md">
            Student-managed club. Content represents individual views.
          </p>

          <p className="text-muted-foreground/50 text-xs">
            © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
