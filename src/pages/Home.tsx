import { useMemo, useState } from "react";
import { useAggregatedFeed } from "@/lib/useSiteData";
import type { AggregatedFeedItem } from "@/lib/data";
import HeroBackground from "@/components/HeroBackground";
import ProfileCard from "@/components/ProfileCard";
import { motion } from "framer-motion";
import { Clock, MessageCircle, Heart, Share2, Zap, Globe, Code, Video, Folder, Loader2 } from "lucide-react";
import { Link } from "wouter";

const iconMap: Record<string, React.ReactNode> = {
  update:    <Zap size={15} />,
  article:   <Code size={15} />,
  video:     <Video size={15} />,
  project:   <Folder size={15} />,
  milestone: <Globe size={15} />,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Home() {
  const { data: feedItems, isLoading } = useAggregatedFeed();
  const activityDates = feedItems.map((i) => i.createdAt);

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
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent border border-border text-primary text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                最新动态
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black leading-tight mb-4">
              <span className="gradient-text">余白</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              记录技术、思考与感悟的数字角落。
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

          {/* Right: heatmap + feed */}
          <div className="space-y-5 min-w-0">
            <ContributionHeatmap dates={activityDates} />

            <div className="flex items-center gap-3 px-1">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">最新动态</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="animate-spin text-primary" size={28} />
              </div>
            ) : feedItems.length > 0 ? (
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
                }}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                {feedItems.map((item) => (
                  <AggregatedFeedCard key={item.id} item={item} />
                ))}
              </motion.div>
            ) : (
              <p className="text-muted-foreground text-center py-16 text-sm">暂无动态</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Contribution heatmap ─────────────────────────────────────── */

function ContributionHeatmap({ dates }: { dates: string[] }) {
  const COL_W = 14; // cell 10px + gap 4px

  const { weeks, months, total } = useMemo(() => {
    const map: Record<string, number> = {};
    dates.forEach((d) => {
      const key = d.slice(0, 10);
      map[key] = (map[key] ?? 0) + 1;
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(today.getDate() - 364);
    start.setDate(start.getDate() - start.getDay()); // align to Sunday

    const weeks: { dateStr: string; date: Date; count: number }[][] = [];
    const cur = new Date(start);
    while (cur <= today) {
      const week: { dateStr: string; date: Date; count: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const key = cur.toISOString().slice(0, 10);
        week.push({ dateStr: key, date: new Date(cur), count: map[key] ?? 0 });
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
    }

    const months: { label: string; col: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const m = week[0].date.getMonth();
      if (m !== lastMonth) {
        months.push({ label: week[0].date.toLocaleDateString("zh-CN", { month: "short" }), col: i });
        lastMonth = m;
      }
    });

    const total = Object.values(map).reduce((a, b) => a + b, 0);
    return { weeks, months, total };
  }, [dates]);

  const levelColor = (n: number) => {
    if (n === 0) return "bg-border/50";
    if (n === 1) return "bg-primary/25";
    if (n === 2) return "bg-primary/50";
    if (n === 3) return "bg-primary/75";
    return "bg-primary";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">活动记录</p>
        <p className="text-[11px] text-muted-foreground">{total} 次活动 · 最近一年</p>
      </div>

      <div className="overflow-x-auto pb-1">
        {/* Month labels */}
        <div className="relative h-4 mb-1" style={{ width: `${weeks.length * COL_W + 20}px` }}>
          {months.map((m, i) => (
            <span
              key={i}
              className="absolute text-[10px] text-muted-foreground"
              style={{ left: `${20 + m.col * COL_W}px` }}
            >
              {m.label}
            </span>
          ))}
        </div>

        {/* Grid with day labels */}
        <div className="flex gap-1">
          {/* Day-of-week labels */}
          <div className="flex flex-col gap-1 shrink-0 w-4">
            {["", "一", "", "三", "", "五", ""].map((d, i) => (
              <div key={i} className="h-2.5 flex items-center justify-end">
                <span className="text-[9px] text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>

          {/* Week columns */}
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <div
                  key={di}
                  title={day.count > 0 ? `${day.dateStr} · ${day.count} 次` : day.dateStr}
                  className={`w-2.5 h-2.5 rounded-sm ${levelColor(day.count)} hover:ring-1 hover:ring-primary/60 transition-all cursor-default`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-3 justify-end">
          <span className="text-[10px] text-muted-foreground">少</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div key={l} className={`w-2.5 h-2.5 rounded-sm ${levelColor(l)}`} />
          ))}
          <span className="text-[10px] text-muted-foreground">多</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Feed card ─────────────────────────────────────────────────── */

function AggregatedFeedCard({ item }: { item: AggregatedFeedItem }) {
  const [liked, setLiked] = useState(false);
  const tags = item.tags ?? [];
  const dateStr = new Date(item.createdAt).toLocaleDateString("zh-CN");
  const typeLabel = item.type === "article" ? "文章" : item.type === "video" ? "视频" : "项目";
  const isExternal = item.href.startsWith("http");

  const inner = (
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-accent border border-border flex items-center justify-center text-primary">
        {iconMap[item.type] ?? <Zap size={15} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock size={10} /> {dateStr}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-accent text-primary text-[11px] font-medium">
            {typeLabel}
          </span>
          {tags.map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded bg-accent/60 text-muted-foreground text-[11px]">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-base font-display font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {item.content}
        </p>
        <div className="flex items-center gap-5">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
            className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            <Heart size={12} fill={liked ? "currentColor" : "none"} />
            <span>{liked ? 1 : 0}</span>
          </button>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle size={12} /><span>0</span>
          </button>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
            <Share2 size={12} /><span>分享</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <motion.article variants={fadeInUp} className="glass-card rounded-2xl p-5 group">
        <a href={item.href} target="_blank" rel="noopener noreferrer">{inner}</a>
      </motion.article>
    );
  }
  if (item.href) {
    return (
      <Link href={item.href}>
        <motion.article variants={fadeInUp} className="glass-card rounded-2xl p-5 group cursor-pointer">
          {inner}
        </motion.article>
      </Link>
    );
  }
  return (
    <motion.article variants={fadeInUp} className="glass-card rounded-2xl p-5 group">
      {inner}
    </motion.article>
  );
}
