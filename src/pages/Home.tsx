import { useAggregatedFeed } from "@/lib/useSiteData";
import type { AggregatedFeedItem } from "@/lib/data";
import { motion } from "framer-motion";
import { Clock, MessageCircle, Heart, Share2, Zap, Globe, Code, Video, Folder, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";


const iconMap: Record<string, React.ReactNode> = {
  update: <Zap size={18} />,
  article: <Code size={18} />,
  video: <Video size={18} />,
  project: <Folder size={18} />,
  milestone: <Globe size={18} />,
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const FALLBACK_HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663287023784/FU8KrTQkmJEEcfhuSWS3mH/hero-bg-Sg76HaQCVYyNzL24v4tzb5.webp";

export default function Home() {
  const { data: feedItems, isLoading } = useAggregatedFeed();
  const base = import.meta.env.BASE_URL || "/";
  const [heroBg, setHeroBg] = useState(() => (base.endsWith("/") ? base : base + "/") + "hero-bg-zhongshi.png");
  const onHeroBgError = () => setHeroBg(FALLBACK_HERO_BG);

  return (
    <div>
      <section className="relative -mt-28 overflow-hidden">
        {/* 底层：实色渐变兜底 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510] via-[#1c1812] to-background" />
        {/* 中层：背景图放在上面 */}
        <div
          className="absolute inset-0 bg-cover bg-center z-[1]"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <img src={heroBg} alt="" className="hidden" onError={onHeroBgError} />
        {/* 顶层：半透明渐变，让背景图透出 */}
        <div
          className="absolute inset-0 z-[2] bg-gradient-to-b from-[#1a1510]/85 via-[#1c1812]/70 via-[#1e1a14]/50 to-background/90"
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent border border-border text-primary text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                最新动态
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              <span className="text-foreground">探索</span>
              <span className="gradient-text">信息</span>
              <br />
              <span className="text-foreground">的无限可能</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              记录技术探索、项目实践与思考感悟。在这里，你可以看到我的最新动态、技术文章、视频分享和开源项目。
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
        ) : feedItems.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            {feedItems.map((item) => (
              <AggregatedFeedCard key={item.id} item={item} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">暂无动态</p>
            <p className="text-muted-foreground text-sm mt-2">暂无文章、视频或项目数据</p>
          </div>
        )}
      </section>
    </div>
  );
}

function AggregatedFeedCard({ item }: { item: AggregatedFeedItem }) {
  const [liked, setLiked] = useState(false);
  const tags = item.tags ?? [];
  const dateStr = new Date(item.createdAt).toLocaleDateString("zh-CN");
  const typeLabel = item.type === "article" ? "文章" : item.type === "video" ? "视频" : "项目";
  const isExternal = item.href.startsWith("http");
  const content = (
    <>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent border border-border flex items-center justify-center text-primary">
          {iconMap[item.type] || <Zap size={18} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock size={12} />
              <span>{dateStr}</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-accent text-primary text-xs font-medium">
              {typeLabel}
            </span>
            <div className="flex gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-accent text-primary text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {item.content}
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
              className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${
                liked ? "text-[#f43f5e]" : "text-muted-foreground hover:text-[#f43f5e]"
              }`}
            >
              <Heart size={14} fill={liked ? "currentColor" : "none"} />
              <span>{liked ? 1 : 0}</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
              <MessageCircle size={14} />
              <span>0</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
              <Share2 size={14} />
              <span>分享</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <motion.article variants={fadeInUp} className="glass-card rounded-2xl p-6 group">
        <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      </motion.article>
    );
  }
  if (item.href) {
    return (
      <Link href={item.href}>
        <motion.article
          variants={fadeInUp}
          className="glass-card rounded-2xl p-6 group cursor-pointer"
        >
          {content}
        </motion.article>
      </Link>
    );
  }
  return (
    <motion.article variants={fadeInUp} className="glass-card rounded-2xl p-6 group">
      {content}
    </motion.article>
  );
}
