import { motion } from "framer-motion";
import HeroBackground from "@/components/HeroBackground";
import ProfileCard from "@/components/ProfileCard";
import { Mail, Github, MessageSquare } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-4">{title}</p>
      {children}
    </div>
  );
}

const TIMELINE: { period: string; title: string; desc: string }[] = [
  { period: "待填写", title: "待填写", desc: "待填写经历描述" },
  { period: "待填写", title: "待填写", desc: "待填写经历描述" },
];

const CONTACTS = [
  { icon: <Github size={14} />,        label: "yubai314",    href: "https://github.com/yubai314" },
  { icon: <Mail size={14} />,          label: "待填写邮箱",  href: "#" },
  { icon: <MessageSquare size={14} />, label: "待填写",      href: "#" },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative -mt-28 overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl font-display font-black leading-tight mb-4">
              <span className="text-foreground">关于</span>
              <span className="gradient-text">我</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              保持好奇，持续探索。
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-28 z-[3] pointer-events-none hero-bottom-fade" />
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">

          {/* Left sidebar */}
          <div className="lg:sticky lg:top-28">
            <ProfileCard />
          </div>

          {/* Right: about content */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate="show"
            className="space-y-4 min-w-0"
          >
            {/* Bio */}
            <motion.div variants={fadeInUp}>
              <Section title="简介">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  待填写个人简介……
                </p>
              </Section>
            </motion.div>

            {/* Timeline */}
            <motion.div variants={fadeInUp}>
              <Section title="经历">
                <div className="space-y-0">
                  {TIMELINE.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center pt-1.5 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary ring-2 ring-primary/20" />
                        {i < TIMELINE.length - 1 && (
                          <div className="w-px flex-1 bg-border mt-1.5 mb-1.5" style={{ minHeight: "2rem" }} />
                        )}
                      </div>
                      <div className="pb-5">
                        <span className="text-[11px] text-muted-foreground">{item.period}</span>
                        <p className="text-sm font-semibold text-foreground mt-0.5">{item.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </motion.div>

            {/* Contact */}
            <motion.div variants={fadeInUp}>
              <Section title="联系方式">
                <div className="flex flex-wrap gap-2">
                  {CONTACTS.map((c, i) => (
                    <a
                      key={i}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
                    >
                      {c.icon}
                      <span>{c.label}</span>
                    </a>
                  ))}
                </div>
              </Section>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
