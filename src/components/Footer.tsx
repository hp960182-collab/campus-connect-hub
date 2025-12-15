import { MessageCircle, Smartphone, Camera } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-ivory">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-ivory mb-4">
              StudentConnect
            </h3>
            <p className="text-ivory/70 leading-relaxed mb-6">
              A student-led digital community fostering peer learning,
              meaningful engagement, and campus collaboration.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-ivory/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="w-5 h-5 text-ivory" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-ivory/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <Smartphone className="w-5 h-5 text-ivory" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-ivory/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Camera className="w-5 h-5 text-ivory" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-ivory mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-ivory/70 hover:text-gold transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#platforms"
                  className="text-ivory/70 hover:text-gold transition-colors"
                >
                  Platforms
                </a>
              </li>
              <li>
                <a
                  href="#activities"
                  className="text-ivory/70 hover:text-gold transition-colors"
                >
                  Activities
                </a>
              </li>
              <li>
                <a
                  href="#guidelines"
                  className="text-ivory/70 hover:text-gold transition-colors"
                >
                  Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#join"
                  className="text-ivory/70 hover:text-gold transition-colors"
                >
                  Join Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-ivory mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:studentconnect@college.edu"
                  className="text-ivory/70 hover:text-gold transition-colors"
                >
                  studentconnect@college.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-ivory/10 pt-8">
          {/* Disclaimer */}
          <p className="text-ivory/50 text-sm text-center mb-4 max-w-3xl mx-auto">
            <strong>Disclaimer:</strong> This is a student-managed club. Content
            represents individual student views and does not reflect official
            college opinions.
          </p>

          {/* Copyright */}
          <p className="text-ivory/40 text-sm text-center">
            © {currentYear} StudentConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
