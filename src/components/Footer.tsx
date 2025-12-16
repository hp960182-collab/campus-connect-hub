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
    <footer className="py-16 bg-background border-t border-border/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Flower2 className="w-5 h-5 text-sakura" />
            <span className="font-display text-lg text-foreground">StudentConnect</span>
          </Link>
          
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-muted-foreground text-sm hover:text-sakura-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <p className="text-muted-foreground text-xs text-center max-w-md">
            This is a student-managed club. Content represents individual student views 
            and does not reflect official college opinions.
          </p>

          <p className="text-muted-foreground/50 text-xs">
            © {currentYear} StudentConnect
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
