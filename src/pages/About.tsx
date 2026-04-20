import { motion } from "framer-motion";
import HeroBackground from "@/components/HeroBackground";

export default function About() {
  return (
    <div>
      <section className="relative -mt-28 overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              关于<span className="gradient-text">我们</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              保持好奇
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-28 z-[3] pointer-events-none hero-bottom-fade" aria-hidden />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass-card rounded-2xl p-8 w-full min-h-[425px]"
        />
      </section>
    </div>
  );
}
