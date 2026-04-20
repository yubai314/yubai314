/*
 * Design: Digital Topography — 数字地形学
 * Layout: 毛玻璃导航栏悬浮于内容之上，底部简洁页脚
 * Colors: 墨蓝黑背景，星际蓝强调色
 */
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
      {/* Ambient gradient orbs — fixed background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#1e3a5f] opacity-20 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-[#3b82f6] opacity-10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-[#6366f1] opacity-8 blur-[80px]" />
      </div>

      {/* Navigation — glassmorphism sticky top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mt-4 rounded-2xl bg-[#060b18]/70 backdrop-blur-xl border border-[#3b82f6]/10 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between h-16 px-6">
              {/* Logo */}
              <Link href="/">
                <span className="font-display font-bold text-xl tracking-tight gradient-text">
                  无限循环
                </span>
              </Link>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <Link key={item.path} href={item.path}>
                      <span
                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-[#94a3b8] hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-lg bg-[#3b82f6]/15 border border-[#3b82f6]/25"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                          />
                        )}
                        <span className="relative z-10">{item.label}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-[#94a3b8] hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden overflow-hidden border-t border-[#3b82f6]/10"
                >
                  <div className="px-4 py-3 space-y-1">
                    {navItems.map((item) => {
                      const isActive = location === item.path;
                      return (
                        <Link key={item.path} href={item.path}>
                          <span
                            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                              isActive
                                ? "text-white bg-[#3b82f6]/15 border border-[#3b82f6]/25"
                                : "text-[#94a3b8] hover:text-white hover:bg-white/5"
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

      {/* Main content */}
      <main className="relative z-10 pt-28 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#3b82f6]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="font-display font-bold text-lg gradient-text">无限循环</span>
              <p className="text-sm text-muted-foreground">探索数字世界的无限可能</p>
            </div>
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span className="text-sm text-muted-foreground hover:text-white transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[#3b82f6]/5 text-center">
            <p className="text-xs text-muted-foreground/60">
              &copy; {new Date().getFullYear()} 无限循环. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
