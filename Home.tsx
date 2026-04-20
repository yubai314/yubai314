/*
 * Design: Digital Topography — 数字地形学
 * Page: 主页 — 个人最新动态 Feed
 * 数据从数据库通过 tRPC 获取
 */
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Clock, MessageCircle, Heart, Share2, ArrowRight, Zap, Globe, Code, Loader2 } from "lucide-react";
import { useState } from "react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663287023784/FU8KrTQkmJEEcfhuSWS3mH/hero-bg-Sg76HaQCVYyNzL24v4tzb5.webp";

const iconMap: Record<string, React.ReactNode> = {
  update: <Zap size={18} />,
  article: <Code size={18} />,
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
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const { user } = useAuth();
  const { data: feedItems, isLoading } = trpc.feed.list.useQuery();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative -mt-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b18]/40 via-[#060b18]/60 to-background" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#60a5fa] text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
                最新动态
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              <span className="text-white">探索</span>
              <span className="gradient-text">数字世界</span>
              <br />
              <span className="text-white">的无限可能</span>
            </h1>
            <p className="text-lg text-[#94a3b8] leading-relaxed max-w-2xl">
              记录技术探索、项目实践与思考感悟。在这里，你可以看到我的最新动态、技术文章、视频分享和开源项目。
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Feed Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#3b82f6]" size={32} />
          </div>
        ) : feedItems && feedItems.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            {feedItems.map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">暂无动态</p>
            <p className="text-muted-foreground/60 text-sm mt-2">管理员登录后可以发布新动态</p>
          </div>
        )}
      </section>
    </div>
  );
}

interface FeedItemData {
  id: number;
  title: string;
  content: string;
  type: string | null;
  tags: string | null;
  likes: number | null;
  comments: number | null;
  createdAt: Date;
}

function FeedCard({ item }: { item: FeedItemData }) {
  const [liked, setLiked] = useState(false);
  const parsedTags: string[] = item.tags ? (() => { try { return JSON.parse(item.tags); } catch { return []; } })() : [];
  const dateStr = new Date(item.createdAt).toLocaleDateString("zh-CN");

  return (
    <motion.article
      variants={fadeInUp}
      className="glass-card rounded-2xl p-6 group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#60a5fa]">
          {iconMap[item.type || "update"] || <Zap size={18} />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock size={12} />
              <span>{dateStr}</span>
            </div>
            <div className="flex gap-2">
              {parsedTags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-[#3b82f6]/10 text-[#60a5fa] text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-[#60a5fa] transition-colors duration-300">
            {item.title}
          </h3>

          <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">
            {item.content}
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${
                liked ? "text-[#f43f5e]" : "text-muted-foreground hover:text-[#f43f5e]"
              }`}
            >
              <Heart size={14} fill={liked ? "currentColor" : "none"} />
              <span>{liked ? (item.likes || 0) + 1 : item.likes || 0}</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#60a5fa] transition-colors duration-200">
              <MessageCircle size={14} />
              <span>{item.comments || 0}</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#60a5fa] transition-colors duration-200">
              <Share2 size={14} />
              <span>分享</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
