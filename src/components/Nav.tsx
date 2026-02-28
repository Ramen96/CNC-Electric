import { useState, useEffect, type ReactNode } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/cncelectricco-logo.png";

interface HoverCardProps {
  children: ReactNode;
  visible: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

interface CopyFeedback {
  phone: boolean;
  email: boolean;
}

const socialMediaLinks = [
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/people/CnC/61578106953385/",
    icon: <FaFacebook className="w-5 h-5" />,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com",
    icon: <FaInstagram className="w-5 h-5" />,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/company",
    icon: <FaLinkedin className="w-5 h-5" />,
  },
];

const navSections = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Portfolio" },
  { id: "testimonials", label: "Testimonials" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "careers", label: "Careers", isExternalRoute: true, path: "/careers" },
];

const HoverCard = ({ children, visible, onEnter, onLeave }: HoverCardProps) => (
  <div
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    className={`absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-md rounded-xl border border-yellow-500/30 shadow-xl p-4 z-50 transition-all duration-200 ${visible ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
      }`}
  >
    {children}
  </div>
);

export default function Nav() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [phoneHovered, setPhoneHovered] = useState<boolean>(false);
  const [emailHovered, setEmailHovered] = useState<boolean>(false);
  const [socialHovered, setSocialHovered] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<CopyFeedback>({ phone: false, email: false });

  const copyToClipboard = async (text: string, type: keyof CopyFeedback) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => setCopyFeedback((prev) => ({ ...prev, [type]: false })), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navSections
        .filter((s) => !s.isExternalRoute)
        .map((s) => document.getElementById(s.id))
        .filter(Boolean);

      const current = sections.findLast(
        (section) => section !== null && section.getBoundingClientRect().top <= 100
      );
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 translate-y-0 ${scrolled ? "bg-black/90 backdrop-blur-xl border-b border-yellow-500/30 shadow-2xl" : "bg-transparent"
        }`}
    >
      {/* Desktop Navigation */}
      <div className="hidden xl:flex items-center justify-between h-20 px-8">

        {/* Left: Social Media */}
        <div className="flex items-center gap-3">
          {socialMediaLinks.map((social) => (
            <div key={social.id} className="relative">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 active:scale-90 inline-block"
                onMouseEnter={() => setSocialHovered(social.id)}
                onMouseLeave={() => setSocialHovered(null)}
              >
                {social.icon}
              </a>
              <HoverCard
                visible={socialHovered === social.id}
                onEnter={() => setSocialHovered(social.id)}
                onLeave={() => setSocialHovered(null)}
              >
                <p className="text-yellow-400 font-semibold text-sm">Follow us on</p>
                <p className="text-white text-sm">{social.name}</p>
              </HoverCard>
            </div>
          ))}
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center space-x-8">
          {navSections.map((section) =>
            section.isExternalRoute ? (
              <a
                href={section.path}
                key={section.id}
                className="px-4 py-2 text-gray-300 hover:text-yellow-400 transition-colors duration-300"
              >
                {section.label}
              </a>
            ) : (
              <button
                key={section.id}
                className={`px-4 py-2 transition-colors duration-300 relative ${activeSection === section.id
                  ? "text-yellow-400"
                  : "text-gray-300 hover:text-yellow-400"
                  }`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full transition-all duration-300 ${activeSection === section.id ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                />
              </button>
            )
          )}
        </nav>

        {/* Right: Contact + Logo */}
        <div className="flex items-center gap-3">

          {/* Phone */}
          <div className="relative">
            <a
              href="tel:7048794057"
              className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 inline-block"
              onMouseEnter={() => setPhoneHovered(true)}
              onMouseLeave={() => setPhoneHovered(false)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <HoverCard
              visible={phoneHovered}
              onEnter={() => setPhoneHovered(true)}
              onLeave={() => setPhoneHovered(false)}
            >
              <div className="flex items-center gap-3 min-w-50">
                <div>
                  <p className="text-yellow-400 font-semibold text-sm">Call Now</p>
                  <p className="text-white text-sm">(704) 879-4057</p>
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); copyToClipboard("7048794057", "phone"); }}
                  className="p-2 text-gray-400 hover:text-yellow-400 hover:scale-105 transition-all duration-200 rounded-lg"
                >
                  {copyFeedback.phone ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </HoverCard>
          </div>

          {/* Email */}
          <div className="relative">
            <a
              href="mailto:electricco.cnc@gmail.com"
              className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 inline-block"
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <HoverCard
              visible={emailHovered}
              onEnter={() => setEmailHovered(true)}
              onLeave={() => setEmailHovered(false)}
            >
              <div className="flex items-center gap-3 min-w-70">
                <div className="flex-1">
                  <p className="text-yellow-400 font-semibold text-sm">Send Email</p>
                  <p className="text-white text-sm break-all">electricco.cnc@gmail.com</p>
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); copyToClipboard("electricco.cnc@gmail.com", "email"); }}
                  className="p-2 text-gray-400 hover:text-yellow-400 hover:scale-105 transition-all duration-200 rounded-lg"
                >
                  {copyFeedback.email ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </HoverCard>
          </div>

          {/* Logo */}
          <div
            className="cursor-pointer ml-2 hover:scale-105 transition-transform duration-300"
            onClick={() => scrollToSection("hero")}
          >
            <img
              src={logo.src}
              alt="C&C Electrical"
              className={`rounded-full border-2 border-yellow-500/50 object-cover transition-all duration-300 ${scrolled ? "h-10 w-10" : "h-14 w-14"
                }`}
              style={{ boxShadow: "0 0 15px rgba(234, 179, 8, 0.3)" }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="xl:hidden flex items-center justify-between h-16 px-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection("hero")}
        >
          <img
            src={logo.src}
            alt="C&C Electrical"
            className="h-10 w-10 rounded-full border-2 border-yellow-500/50"
            style={{ boxShadow: "0 0 10px rgba(234, 179, 8, 0.3)" }}
          />
          <div>
            <h1 className="text-base font-bold text-white">C&C Electrical</h1>
            <p className="text-xs text-yellow-400/80">Construction & Electrical</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a href="tel:7048794057" className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <a href="mailto:electricco.cnc@gmail.com" className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <button
            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`xl:hidden fixed inset-x-0 top-16 bg-black border-t border-yellow-500/30 transition-all duration-300 ${mobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <nav className="overflow-y-auto h-full">
          {navSections.map((section) =>
            section.isExternalRoute ? (
              <a
                href={section.path}
                key={section.id}
                className="block w-full text-left px-6 py-4 text-gray-200 hover:text-yellow-400 border-b border-gray-800 transition-colors duration-300"
              >
                {section.label}
              </a>
            ) : (
              <button
                key={section.id}
                className={`block w-full text-left px-6 py-4 border-b border-gray-800 transition-colors duration-300 ${activeSection === section.id
                  ? "text-yellow-400 bg-yellow-400/10"
                  : "text-gray-200 hover:text-yellow-400"
                  }`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
