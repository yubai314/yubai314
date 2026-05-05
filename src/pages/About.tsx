import { motion } from "framer-motion";

const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
const ABOUT_BG = `${base}hero-bg-zhongshi.png`;

const focusItems = [
  "AI 工具与应用工程：把模型能力接入真实工作流，而不是只停留在演示。",
  "Rust 与 TypeScript：偏向可靠、可维护、能长期迭代的工程实现。",
  "信息分析与阅读系统：RSS、事件流、知识整理和内容归档。",
  "技术写作与阅读记录：项目复盘、摘抄、随笔和一些跨学科观察。",
];

const projects = [
  {
    name: "ShadowMixer",
    href: "https://github.com/gtr4321/ShadowMixer",
    desc: "面向 AI 调用场景的隐私混淆与零信任网关实验。",
    stack: "Rust / Redis / Docker",
  },
  {
    name: "NexusReader",
    href: "https://github.com/gtr4321/NexusReader",
    desc: "结合 RSS 阅读和事件流画布的信息分析系统。",
    stack: "Next.js / Electron / FastAPI / SQLite",
  },
  {
    name: "个人网站",
    href: "https://yubai314.github.io/yubai314/",
    desc: "发布文章、项目记录、摘抄和随笔的长期归档。",
    stack: "React / TypeScript / GitHub Pages",
  },
];

const articles = [
  {
    title: "论不确定的纲领与癔症化",
    href: "https://yubai314.github.io/yubai314/articles/3",
    desc: "从拉康视角讨论纲领模糊、权威姿态与主体症候。",
  },
  {
    title: "人为何迷恋上课时窗外的大雨",
    href: "https://yubai314.github.io/yubai314/articles/4",
    desc: "关于课堂、窗外大雨和象征秩序缝隙的一段分析。",
  },
  {
    title: "《蒹葭堂杂著摘抄》选段",
    href: "https://yubai314.github.io/yubai314/articles/2",
    desc: "关于奢俭、民生与地方风俗的一段摘抄。",
  },
];

const techStack = ["Rust", "Python", "TypeScript", "Agentic Runtime"];

export default function About() {
  return (
    <div>
      <section className="relative -mt-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510] via-[#1c1812] to-background" />
        <div
          className="absolute inset-0 bg-cover bg-center z-[1]"
          style={{ backgroundImage: `url(${ABOUT_BG})` }}
        />
        <div
          className="absolute inset-0 z-[2] bg-gradient-to-b from-[#1a1510]/85 via-[#1c1812]/70 via-[#1e1a14]/50 to-background/90"
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              关于<span className="gradient-text">我</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              技术实践、信息分析与长期写作。
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-28 z-[3] pointer-events-none hero-bottom-fade" aria-hidden />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass-card rounded-2xl p-6 sm:p-8 w-full"
        >
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">关于我</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  我在持续记录技术实践、项目构建和阅读思考。当前主要关注 AI 应用工程、Rust / TypeScript 开发、信息分析工具，以及个人知识系统的长期维护。
                </p>
                <p>
                  这个主页更像一份索引：你可以从这里看到我正在做的项目、最近写下的文章，以及我常用的技术栈。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">当前关注</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                {focusItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">代表项目</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <a
                    key={project.name}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border-l border-border pl-4"
                  >
                    <h3 className="font-display font-bold text-foreground mb-2 transition-colors group-hover:text-primary">{project.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{project.desc}</p>
                    <p className="text-xs text-primary">{project.stack}</p>
                  </a>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">最近文章</h2>
              <div className="space-y-3">
                {articles.map((article) => (
                  <a
                    key={article.title}
                    href={article.href}
                    className="block text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="text-primary">{article.title}</span>
                    <span>：{article.desc}</span>
                  </a>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">技术栈</h2>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-muted-foreground">
                {techStack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
