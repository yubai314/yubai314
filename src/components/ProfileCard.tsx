import { Github, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useArticles, useProjects, useVideos } from "@/lib/useSiteData";

const SKILL_COLORS: Record<string, string> = {
  Rust:         "bg-orange-950/60 text-orange-300 border-orange-800/50",
  TypeScript:   "bg-blue-950/60 text-blue-300 border-blue-800/50",
  JavaScript:   "bg-yellow-950/60 text-yellow-300 border-yellow-800/50",
  Python:       "bg-green-950/60 text-green-300 border-green-800/50",
  Go:           "bg-sky-950/60 text-sky-300 border-sky-800/50",
  React:        "bg-cyan-950/60 text-cyan-300 border-cyan-800/50",
  "Next.js":    "bg-zinc-800/60 text-zinc-200 border-zinc-600/50",
  "Node.js":    "bg-emerald-950/60 text-emerald-300 border-emerald-800/50",
  Docker:       "bg-sky-950/60 text-sky-300 border-sky-800/50",
  Redis:        "bg-red-950/60 text-red-300 border-red-800/50",
  SQLite:       "bg-teal-950/60 text-teal-300 border-teal-800/50",
  FastAPI:      "bg-emerald-950/60 text-emerald-300 border-emerald-800/50",
  Electron:     "bg-purple-950/60 text-purple-300 border-purple-800/50",
};

const DEFAULT_COLOR = "bg-accent text-primary border-border";

export default function ProfileCard() {
  const { data: articles } = useArticles();
  const { data: projects } = useProjects();
  const { data: videos } = useVideos();

  const skills = Array.from(
    new Set(
      projects.flatMap((p) => {
        try { return JSON.parse(p.tech ?? "[]") as string[]; }
        catch { return []; }
      })
    )
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-4"
    >
      {/* Identity card */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col items-center text-center mb-5">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 flex items-center justify-center font-display font-black text-2xl text-white shadow-lg shadow-indigo-900/40">
              余
            </div>
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-background shadow" />
          </div>
          <h2 className="font-display font-black text-xl text-foreground tracking-tight">余白</h2>
          <p className="text-xs text-muted-foreground mt-0.5">@yubai314</p>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            待填写个人简介
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <MapPin size={11} />
          <span>待填写</span>
        </div>

        <a
          href="https://github.com/yubai314"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl bg-accent border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
        >
          <Github size={13} />
          <span>yubai314</span>
        </a>

        <div className="grid grid-cols-3 gap-1 mt-4 pt-4 border-t border-border text-center">
          {[
            { label: "文章", value: articles.length },
            { label: "项目", value: projects.length },
            { label: "视频", value: videos.length },
          ].map((s) => (
            <div key={s.label} className="py-1">
              <div className="text-lg font-display font-bold text-foreground leading-none">{s.value}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      {skills.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">技术栈</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className={`px-2 py-0.5 text-[11px] font-medium rounded border ${SKILL_COLORS[skill] ?? DEFAULT_COLOR}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
