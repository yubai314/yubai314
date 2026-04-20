import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-6xl font-display font-bold gradient-text mb-4">404</h1>
        <p className="text-muted-foreground text-lg mb-6">页面不存在</p>
        <Link href="/">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent border border-border text-primary hover:bg-muted transition-colors duration-200">
            返回首页
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
