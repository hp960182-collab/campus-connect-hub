import { Flower2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "ERP Portal", href: "#", external: true },
  { label: "LMS", href: "#", external: true },
  { label: "Discord", href: "#", external: true },
  { label: "WhatsApp", href: "#", external: true },
];

const resourceLinks = [
  { label: "FAQs", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "College Site", href: "#", external: true },
  { label: "Important Resources", href: "#" },
];

const footerNavLinks = [
  { label: "About", href: "/#about" },
  { label: "Links", href: "/links" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Join", href: "/join" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-background border-t border-border/40 relative overflow-hidden">
      {/* Subtle sakura watermark */}
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-[0.03] pointer-events-none">
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

      <div className="container-main relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-sakura-light/60 flex items-center justify-center group-hover:bg-sakura-light transition-colors">
                <Flower2 className="w-4 h-4 text-sakura-dark" />
              </div>
              <span className="font-serif text-lg font-semibold text-foreground">StudentConnect</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A student-led community fostering peer learning and meaningful connections at DYPIU.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {footerNavLinks.map((link) => (
                link.href.startsWith("/#") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-sakura-dark transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-sakura-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-sakura-dark transition-colors inline-flex items-center gap-1"
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                  {link.external && <ExternalLink className="w-3 h-3" />}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
            <nav className="flex flex-col gap-2">
              {resourceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-sakura-dark transition-colors inline-flex items-center gap-1"
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                  {link.external && <ExternalLink className="w-3 h-3" />}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs text-center md:text-left">
              This is a student-managed club. Content represents individual student views 
              and does not reflect official college opinions.
            </p>
            <p className="text-muted-foreground/60 text-xs">
              © {currentYear} StudentConnect
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
