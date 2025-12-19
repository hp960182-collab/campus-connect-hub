import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flower2, Bell, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Links", href: "/links" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Join", href: "/join" },
];

const notifications = [
  { id: 1, title: "New Event", message: "Study group meetup this Friday", time: "2h ago", unread: true },
  { id: 2, title: "Welcome!", message: "Thanks for joining StudentConnect", time: "1d ago", unread: false },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = () => {
      setShowNotifications(false);
      setShowSearch(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.substring(1);
    return location.pathname === href;
  };

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const active = isActive(item.href);
    const baseClasses = "relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg";
    const stateClasses = active 
      ? "text-sakura-dark" 
      : "text-foreground/60 hover:text-sakura-dark hover:bg-sakura-light/40";
    const focusClasses = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura/50";

    const content = (
      <>
        {item.label}
        {active && (
          <motion.span 
            layoutId="nav-indicator"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-sakura rounded-full"
          />
        )}
      </>
    );

    if (item.href.startsWith("/#")) {
      return (
        <a href={item.href} className={`${baseClasses} ${stateClasses} ${focusClasses}`}>
          {content}
        </a>
      );
    }

    return (
      <Link to={item.href} className={`${baseClasses} ${stateClasses} ${focusClasses}`}>
        {content}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md py-3 border-b border-border/50 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-main">
        <nav className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-sakura-light/60 flex items-center justify-center group-hover:bg-sakura-light transition-colors duration-200">
              <Flower2 className="w-4 h-4 text-sakura-dark" />
            </div>
            <span className="font-serif text-lg font-semibold text-foreground">StudentConnect</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/60 hover:text-sakura-dark hover:bg-sakura-light/40"
                onClick={() => {
                  setShowSearch(!showSearch);
                  setShowNotifications(false);
                }}
              >
                <Search className="w-4 h-4" />
              </Button>
              
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-card border border-border rounded-xl shadow-lg p-3"
                  >
                    <input
                      type="text"
                      placeholder="Search events, clubs, resources..."
                      className="input-base text-sm"
                      autoFocus
                    />
                    <p className="text-xs text-muted-foreground mt-2 px-1">
                      Try: "study groups", "tech clubs", "events"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/60 hover:text-sakura-dark hover:bg-sakura-light/40 relative"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowSearch(false);
                }}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-sakura text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-border/50">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer ${
                            notif.unread ? "bg-sakura-light/20" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {notif.unread && (
                              <span className="w-2 h-2 bg-sakura rounded-full mt-1.5 flex-shrink-0" />
                            )}
                            <div className={notif.unread ? "" : "ml-5"}>
                              <p className="text-sm font-medium">{notif.title}</p>
                              <p className="text-xs text-muted-foreground">{notif.message}</p>
                              <p className="text-xs text-muted-foreground/60 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-border/50">
                      <button className="text-xs text-sakura-dark hover:underline">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Join CTA */}
            <Button variant="sakura" size="sm" asChild className="ml-2">
              <Link to="/join">Join Us</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground hover:bg-accent rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 mt-4 bg-card/95 backdrop-blur-md rounded-xl border border-border/50 shadow-lg">
                <div className="flex flex-col items-center gap-2 px-4">
                  {navItems.map((item) => (
                    item.href.startsWith("/#") ? (
                      <a
                        key={item.label}
                        href={item.href}
                        className={`w-full text-center py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                          isActive(item.href) 
                            ? "text-sakura-dark bg-sakura-light/50" 
                            : "text-foreground/70 hover:text-sakura-dark hover:bg-sakura-light/30"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.href}
                        className={`w-full text-center py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                          isActive(item.href) 
                            ? "text-sakura-dark bg-sakura-light/50" 
                            : "text-foreground/70 hover:text-sakura-dark hover:bg-sakura-light/30"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
                <div className="mt-4 px-4">
                  <Button variant="sakura" className="w-full" asChild>
                    <Link to="/join" onClick={() => setIsMobileMenuOpen(false)}>
                      Join Us
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
