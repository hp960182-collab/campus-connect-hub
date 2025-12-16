import { Flower2 } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Links", href: "/links" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Join", href: "/join" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-background border-t border-border/30 relative overflow-hidden">
      {/* Faint sakura watermark */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M100 200 Q90 150 110 100 Q130 50 100 0"
            fill="none"
            stroke="hsl(340 50% 50%)"
            strokeWidth="3"
          />
          <path
            d="M100 100 Q50 80 20 100"
            fill="none"
            stroke="hsl(340 50% 50%)"
            strokeWidth="2"
          />
          <circle cx="100" cy="60" r="20" fill="hsl(340 60% 75%)" />
          <circle cx="50" cy="90" r="15" fill="hsl(340 60% 75%)" />
          <circle cx="130" cy="80" r="18" fill="hsl(340 60% 75%)" />
        </svg>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 relative">
        <div className="flex flex-col items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Flower2 className="w-5 h-5 text-sakura" />
            <span className="font-display text-lg text-foreground">StudentConnect</span>
          </Link>
          
          <nav className="flex flex-wrap justify-center gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-foreground/50 text-sm hover:text-sakura-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <p className="text-foreground/40 text-xs text-center max-w-md leading-relaxed">
            This is a student-managed club. Content represents individual student views 
            and does not reflect official college opinions.
          </p>

          <p className="text-foreground/30 text-xs">
            © {currentYear} StudentConnect
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
