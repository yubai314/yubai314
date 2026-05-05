import { useProjects } from "@/lib/useSiteData";
import { motion } from "framer-motion";
import { Folder, Star, GitFork, ExternalLink, Github, Loader2 } from "lucide-react";
import { Link } from "wouter";

const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
const PROJECTS_BG = `${base}hero-bg-zhongshi.png`;

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const statusColors: Record<string, string> = {
  active: "bg-accent text-primary border-border",
  maintained: "bg-muted text-primary border-border",
  archived: "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<string, string> = {
  active: "活跃开发",
  maintained: "持续维护",
  archived: "已归档",
};

function parseTech(tech: string | null): string[] {
  if (!tech) return [];
  try {
    return JSON.parse(tech);
  } catch {
    return [];
  }
}

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div>
      <section className="relative -mt-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510] via-[#1c1812] to-background" />
        <div
          className="absolute inset-0 bg-cover bg-center z-[1]"
          style={{ backgroundImage: `url(${PROJECTS_BG})` }}
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
            <div className="flex items-center gap-3 mb-4">
              <Folder size={20} className="text-primary" />
              <span className="text-sm text-primary font-medium">开源项目</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              项目
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              开源项目与技术实践。每个项目都是对技术边界的一次探索。
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-28 z-[3] pointer-events-none hero-bottom-fade" aria-hidden />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : projects.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => {
              const techs = parseTech(project.tech);
              const statusClass = statusColors[project.status || "active"] || statusColors.active;
              const statusLabel = statusLabels[project.status || "active"] || "活跃";
              return (
                <motion.div key={project.id} variants={fadeUp}>
                  <Link href={`/projects/${project.id}`}>
                    <div className="glass-card rounded-2xl p-6 h-full group flex flex-col cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-accent border border-border flex items-center justify-center text-primary">
                          <Folder size={18} />
                        </div>
                        <div className="flex items-center gap-2">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github size={16} />
                            </a>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                          {project.name}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-md border text-xs font-medium ${statusClass}`}>
                          {statusLabel}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                        {project.description || "暂无描述"}
                      </p>
                      {techs.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {techs.map((t) => (
                            <span key={t} className="px-2.5 py-1 rounded-lg bg-muted text-xs text-muted-foreground font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-5 pt-4 border-t border-border">
                        {(project.stars ?? 0) > 0 && (
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Star size={14} className="text-amber-400" />
                            {project.stars}
                          </span>
                        )}
                        {(project.forks ?? 0) > 0 && (
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <GitFork size={14} />
                            {project.forks}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <Folder size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">暂无项目</p>
            <p className="text-muted-foreground text-sm mt-2">可在 public/data/site.json 中配置项目</p>
          </div>
        )}
      </section>
    </div>
  );
}
