import { useProject } from "@/lib/useSiteData";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Folder, Github, ExternalLink, Star, GitFork, Loader2 } from "lucide-react";
import { Link, useParams } from "wouter";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
const PROJECTS_BG = `${base}hero-bg-zhongshi.png`;

function parseTech(tech: string | null): string[] {
  if (!tech) return [];
  try {
    return JSON.parse(tech);
  } catch {
    return [];
  }
}

function getReadmeUrl(githubUrl: string | null): string | null {
  if (!githubUrl) return null;
  try {
    const u = new URL(githubUrl);
    const parts = u.pathname.split("/").filter(Boolean);
    if (u.hostname !== "github.com") return null;
    if (parts.length < 2) return null;
    const owner = parts[0];
    const repo = parts[1];
    return `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
  } catch {
    return null;
  }
}

const statusLabels: Record<string, string> = {
  active: "活跃开发",
  maintained: "持续维护",
  archived: "已归档",
};

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const projectId = parseInt(params.id || "0", 10);
  const { data: project, isLoading, error } = useProject(projectId);
  const [readme, setReadme] = useState<string | null>(null);
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  useEffect(() => {
    if (!project) {
      setReadme(null);
      setReadmeLoading(false);
      setReadmeError(null);
      return;
    }
    const url = getReadmeUrl(project.github);
    if (!url) {
      setReadme(project.description ?? "");
      setReadmeLoading(false);
      setReadmeError(null);
      return;
    }
    setReadmeLoading(true);
    setReadmeError(null);
    fetch(url)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then(setReadme)
      .catch((e: unknown) => {
        setReadme(null);
        setReadmeError(e instanceof Error ? e.message : "Failed to load README");
      })
      .finally(() => setReadmeLoading(false));
  }, [project]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!project || error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">项目未找到</h2>
        <p className="text-muted-foreground mb-6">该项目可能已被删除或不存在。</p>
        <Link href="/projects">
          <span className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeft size={16} />
            返回项目列表
          </span>
        </Link>
      </div>
    );
  }

  const techs = parseTech(project.tech);
  const statusLabel = statusLabels[project.status || "active"] || "活跃";

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
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link href="/projects">
              <span className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors mb-6 cursor-pointer text-sm">
                <ArrowLeft size={16} />
                返回项目列表
              </span>
            </Link>
            <div className="flex items-center gap-3 mb-4 mt-4 flex-wrap">
              <span className="px-2.5 py-1 rounded-md bg-accent text-primary text-xs font-medium">
                {statusLabel}
              </span>
              {(project.createdAt || project.updatedAt) && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  {new Date(project.createdAt || project.updatedAt).toLocaleDateString("zh-CN")}
                </span>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-foreground transition-colors"
                >
                  <Github size={14} />
                  打开 GitHub
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-foreground transition-colors"
                >
                  <ExternalLink size={14} />
                  访问链接
                </a>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4 leading-tight flex items-center gap-3">
              <Folder size={28} className="text-primary" />
              {project.name}
            </h1>
            {project.description && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            )}
            {techs.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {techs.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-muted text-xs text-muted-foreground font-medium">
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-5 mt-4">
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
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-28 z-[3] pointer-events-none hero-bottom-fade" aria-hidden />
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="glass-card rounded-2xl p-8 sm:p-12"
        >
          {readmeLoading ? (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="animate-spin" size={18} />
              正在加载 README…
            </div>
          ) : readmeError ? (
            <div className="text-sm text-muted-foreground">
              README 加载失败：{readmeError}
            </div>
          ) : (
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown>{readme ?? ""}</ReactMarkdown>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
