/*
 * Design: Digital Topography — 数字地形学
 * Page: 个人简介 — 关于我
 * 使用 about-bg 背景图，展示个人信息、技能和经历
 */
import { motion } from "framer-motion";
import { MapPin, Mail, Github, ExternalLink, Award, Briefcase, GraduationCap } from "lucide-react";

const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663287023784/FU8KrTQkmJEEcfhuSWS3mH/about-bg-ADjNM8Z7CoXEzicpj8ZMjy.webp";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Python / AI", level: 85 },
  { name: "Node.js", level: 88 },
  { name: "系统设计", level: 82 },
  { name: "UI/UX 设计", level: 78 },
];

const timeline = [
  {
    year: "2024 - 至今",
    title: "高级前端工程师",
    org: "某科技公司",
    desc: "负责核心产品的前端架构设计与开发，主导多个大型项目的技术选型和落地。",
    icon: <Briefcase size={16} />,
  },
  {
    year: "2022 - 2024",
    title: "全栈开发工程师",
    org: "某互联网公司",
    desc: "参与多个 B 端和 C 端产品的全栈开发，积累了丰富的工程化实践经验。",
    icon: <Briefcase size={16} />,
  },
  {
    year: "2018 - 2022",
    title: "计算机科学与技术",
    org: "某知名大学",
    desc: "主修计算机科学，辅修人工智能方向，在校期间参与多个科研项目。",
    icon: <GraduationCap size={16} />,
  },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative -mt-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ABOUT_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b18]/50 via-[#060b18]/70 to-background" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
              关于<span className="gradient-text">我</span>
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl">
              一名热爱技术的全栈开发者，专注于前端工程、人工智能和开源社区。
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass-card rounded-2xl p-8 sticky top-28">
              {/* Avatar */}
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#6366f1] p-[2px] mb-6">
                <div className="w-full h-full rounded-2xl bg-[#0f172a] flex items-center justify-center">
                  <span className="text-4xl font-display font-bold gradient-text">T</span>
                </div>
              </div>

              <h2 className="text-xl font-display font-bold text-white mb-1">Terra</h2>
              <p className="text-sm text-[#60a5fa] mb-4">全栈开发者 / 技术探索者</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
                  <MapPin size={14} className="text-[#3b82f6]" />
                  <span>中国</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
                  <Mail size={14} className="text-[#3b82f6]" />
                  <span>hello@terra.dev</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
                  <Github size={14} className="text-[#3b82f6]" />
                  <span>github.com/terra</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#3b82f6]/10">
                <div className="text-center">
                  <div className="text-xl font-display font-bold text-white">50+</div>
                  <div className="text-xs text-muted-foreground mt-1">项目</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-display font-bold text-white">2k+</div>
                  <div className="text-xs text-muted-foreground mt-1">Stars</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-display font-bold text-white">100+</div>
                  <div className="text-xs text-muted-foreground mt-1">文章</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#60a5fa]">
                  <Award size={16} />
                </div>
                <h3 className="text-lg font-display font-semibold text-white">技能专长</h3>
              </div>
              <div className="space-y-5">
                {skills.map((skill) => (
                  <motion.div key={skill.name} variants={fadeUp}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-[#e2e8f0]">{skill.name}</span>
                      <span className="text-xs text-[#60a5fa]">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#1e293b] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#60a5fa]">
                  <Briefcase size={16} />
                </div>
                <h3 className="text-lg font-display font-semibold text-white">经历</h3>
              </div>
              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <div key={i} className="relative flex gap-6 pb-8 last:pb-0">
                    {/* Timeline line */}
                    {i < timeline.length - 1 && (
                      <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-[#3b82f6]/30 to-transparent" />
                    )}
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#60a5fa]">
                      {item.icon}
                    </div>
                    {/* Content */}
                    <div>
                      <span className="text-xs text-[#60a5fa] font-medium">{item.year}</span>
                      <h4 className="text-base font-display font-semibold text-white mt-1">{item.title}</h4>
                      <p className="text-sm text-[#94a3b8] mt-0.5">{item.org}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
