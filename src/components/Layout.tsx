import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { path: "/", label: "动态" },
  { path: "/about", label: "关于" },
  { path: "/articles", label: "文章" },
  { path: "/videos", label: "视频" },
  { path: "/projects", label: "项目" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mt-4 rounded-2xl bg-card border border-border shadow-lg">
            <div className="flex items-center justify-between h-16 px-6">
              <Link href="/">
                <span className="font-display font-black text-2xl tracking-tight gradient-text">
                  天机阁
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <Link key={item.path} href={item.path}>
                      <span
                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-lg bg-primary/20 border border-border"
                            transition={{ duration: 0.25, ease: "easeOut" }}
                          />
                        )}
                        <span className="relative z-10">{item.label}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
              <button
                className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="md:hidden overflow-hidden border-t border-border"
                >
                  <div className="px-4 py-3 space-y-1">
                    {navItems.map((item) => {
                      const isActive = location === item.path;
                      return (
                        <Link key={item.path} href={item.path}>
                          <span
                            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              isActive
                                ? "text-primary-foreground bg-primary/20 border border-border"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-28 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="font-display font-black text-lg gradient-text">天机阁</span>
              <p className="text-sm text-muted-foreground">探索信息的无限可能</p>
            </div>
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} 天机阁. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
