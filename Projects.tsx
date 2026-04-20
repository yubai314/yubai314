/*
 * Design: Digital Topography — 数字地形学
 * Page: 项目展示 — 从数据库获取
 */
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Folder, Star, GitFork, ExternalLink, Github, Loader2 } from "lucide-react";

const PROJECTS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663287023784/FU8KrTQkmJEEcfhuSWS3mH/projects-bg-nw6kcZVNHsu43qKUsjAyuh.webp";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  maintained: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  archived: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const statusLabels: Record<string, string> = {
  active: "活跃开发",
  maintained: "持续维护",
  archived: "已归档",
};

export default function Projects() {
  const { data: projects, isLoading } = trpc.project.list.useQuery();

  return (
    <div>
      {/* Hero */}
      <section className="relative -mt-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${PROJECTS_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b18]/50 via-[#060b18]/70 to-background" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Folder size={20} className="text-[#60a5fa]" />
              <span className="text-sm text-[#60a5fa] font-medium">开源项目</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
              项目
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl">
              开源项目与技术实践。每个项目都是对技术边界的一次探索。
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#3b82f6]" size={32} />
          </div>
        ) : projects && projects.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => {
              const techs: string[] = project.tech ? (() => { try { return JSON.parse(project.tech); } catch { return []; } })() : [];
              const statusClass = statusColors[project.status || "active"] || statusColors.active;
              const statusLabel = statusLabels[project.status || "active"] || "活跃";

              return (
                <motion.div key={project.id} variants={fadeUp}>
                  <div className="glass-card rounded-2xl p-6 h-full group flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#6366f1]/20 border border-[#3b82f6]/20 flex items-center justify-center text-[#60a5fa]">
                        <Folder size={18} />
                      </div>
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                            <Github size={16} />
                          </a>
                        )}
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Name & Status */}
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-display font-bold text-white group-hover:text-[#60a5fa] transition-colors">
                        {project.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-md border text-xs font-medium ${statusClass}`}>
                        {statusLabel}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#94a3b8] leading-relaxed mb-5 flex-1">
                      {project.description || "暂无描述"}
                    </p>

                    {/* Tech stack */}
                    {techs.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {techs.map((t: string) => (
                          <span key={t} className="px-2.5 py-1 rounded-lg bg-[#1e293b] text-xs text-[#94a3b8] font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-5 pt-4 border-t border-[#3b82f6]/10">
                      {(project.stars || 0) > 0 && (
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Star size={14} className="text-amber-400" />
                          {project.stars}
                        </span>
                      )}
                      {(project.forks || 0) > 0 && (
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <GitFork size={14} />
                          {project.forks}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <Folder size={48} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground text-lg">暂无项目</p>
            <p className="text-muted-foreground/60 text-sm mt-2">管理员登录后可以添加项目</p>
          </div>
        )}
      </section>
    </div>
  );
}
