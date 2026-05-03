import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Menu, X, FileText, Home, Library, BookMarked } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/templates', label: 'Templates', icon: Library },
  { path: '/saved', label: 'My Documents', icon: BookMarked },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ivory-50/95 backdrop-blur-md border-b border-ink-700/10 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-ink-900 flex items-center justify-center rounded-sm group-hover:bg-gold-500 transition-colors duration-300">
                <Scale size={16} className="text-ivory-50" />
              </div>
              <div>
                <span className="font-display font-bold text-ink-900 text-xl tracking-tight">LexDraft</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`relative font-body text-sm font-medium tracking-wide transition-colors duration-200 ${
                    location.pathname === path ? 'text-ink-900' : 'text-ink-600/60 hover:text-ink-900'
                  }`}
                >
                  {label}
                  {location.pathname === path && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gold-500"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/templates" className="btn-primary text-xs px-4 py-2.5">
                <FileText size={14} />
                New Document
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-ink-900 hover:bg-ink-900/5 rounded-sm transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-ink-900/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 bottom-0 w-72 bg-ivory-50 border-l border-ink-700/10 shadow-2xl"
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-1">
                  {navLinks.map(({ path, label, icon: Icon }) => (
                    <Link
                      key={path}
                      to={path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-sm font-body font-medium text-sm transition-all ${
                        location.pathname === path
                          ? 'bg-ink-900 text-ivory-50'
                          : 'text-ink-700 hover:bg-ink-900/5'
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-ink-700/10">
                  <Link to="/templates" className="btn-primary w-full justify-center text-xs">
                    <FileText size={14} />
                    New Document
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
