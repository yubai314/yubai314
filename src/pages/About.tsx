import { motion } from "framer-motion";

const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
const ABOUT_BG = `${base}hero-bg-zhongshi.png`;

const focusItems = [
  "本地优先新闻工作台：重新定义信息摄入、筛选和长期归档的方式。",
  "Agentic Runtime：把人和模型协作的粒度拆得更细，让交互不只停在对话框。",
  "LLM Harness：管理上下文、工具调用和多模型协调，补上现有方案里不够顺手的层。",
  "计量经济学与因果推断：以 Pearl 的 do-calculus 为框架，把识别策略和现代 ML 接起来。",
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

const techStack = [
  "Rust",
  "Python",
  "TypeScript",
  "Tauri 2",
  "React/Vite",
  "FastAPI",
  "Agentic Runtime",
  "LLM Harness",
];

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
              Agentic runtime、因果推断与信息工作台。
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
                  我是余白。Rust + Python + TypeScript，Tauri 2 桌面端、React/Vite 前端、FastAPI 后层。
                </p>
                <p>
                  正在构建几个我自己真正想用的东西：一个本地优先的新闻工作台，重新定义信息摄入的方式；一个面向 agent 时代的交互运行时，想把人和模型协作的粒度做得更细；还有一个 LLM harness 层，管上下文、工具调用和多模型协调——这块目前大多数方案都不够好。
                </p>
                <p>
                  研究方向以计量经济学和因果推断为主干，Pearl 的 do-calculus 是我目前最认真对待的框架，想把识别策略和现代 ML 真正接起来而不是各说各话。但驱动这一切的底层逻辑其实是非理性主义的：我不相信人的决策来自最优化，相信它来自欲望、结构和历史的合力——尼采讲权力意志，马克思讲生产关系，拉康讲主体永远错过自己想要的东西。这套视角反过来让我对"模型在做什么"这个问题有不一样的直觉。
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
