import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaDna, FaBars, FaTimes, FaGithub } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface-darker/95 backdrop-blur-lg shadow-lg shadow-black/10"
          : "bg-surface-darker/50 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <FaDna className="w-8 h-8 text-primary" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent group-hover:to-primary-light transition-all duration-300">
              MediPredict AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/disease-selection">Predict</NavLink>
            <NavLink to="/about">About</NavLink>
            <a
              href="https://github.com/brighteyekid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <Link
              to="/disease-selection"
              className="bg-gradient-to-r from-primary to-primary-dark hover:to-primary-light px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface-darker/95 backdrop-blur-lg border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <MobileNavLink to="/">Home</MobileNavLink>
              <MobileNavLink to="/disease-selection">Predict</MobileNavLink>
              <MobileNavLink to="/about">About</MobileNavLink>
              <a
                href="https://github.com/brighteyekid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaGithub className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <Link
                to="/disease-selection"
                className="block bg-gradient-to-r from-primary to-primary-dark hover:to-primary-light px-4 py-2 rounded-lg text-center transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative group ${
        isActive ? "text-primary" : "text-gray-300"
      }`}
    >
      {children}
      <motion.div
        initial={false}
        animate={{
          width: isActive ? "100%" : "0%",
        }}
        className="absolute bottom-0 left-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
      />
    </Link>
  );
};

const MobileNavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
