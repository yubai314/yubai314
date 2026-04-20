/*
 * Design: Digital Topography — 数字地形学
 * Page: 文章列表 — 从数据库获取
 */
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";

const ARTICLES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663287023784/FU8KrTQkmJEEcfhuSWS3mH/articles-bg-37MUDrinczoQCwh9boTecm.webp";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Articles() {
  const { data: articles, isLoading } = trpc.article.list.useQuery();

  return (
    <div>
      {/* Hero */}
      <section className="relative -mt-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ARTICLES_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b18]/50 via-[#060b18]/70 to-background" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={20} className="text-[#60a5fa]" />
              <span className="text-sm text-[#60a5fa] font-medium">技术博客</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
              文章
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl">
              深入技术细节，分享实践经验。涵盖前端开发、人工智能、系统设计等多个领域。
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Articles List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#3b82f6]" size={32} />
          </div>
        ) : articles && articles.length > 0 ? (
          <>
            {/* Featured articles */}
            {articles.filter(a => a.featured).length > 0 && (
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              >
                {articles.filter(a => a.featured).map((article) => (
                  <motion.div key={article.id} variants={fadeUp}>
                    <Link href={`/articles/${article.id}`}>
                      <div className="glass-card rounded-2xl p-8 h-full cursor-pointer group relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                          <span className="px-2.5 py-1 rounded-md bg-[#3b82f6]/15 border border-[#3b82f6]/25 text-[#60a5fa] text-xs font-medium">
                            精选
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-2.5 py-1 rounded-md bg-[#6366f1]/10 text-[#818cf8] text-xs font-medium">
                            {article.category || "技术"}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock size={12} />
                            {article.readTime || 10} 分钟
                          </span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-[#60a5fa] transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-sm text-[#94a3b8] leading-relaxed mb-6 line-clamp-3">
                          {article.summary || article.content.slice(0, 200)}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {new Date(article.createdAt).toLocaleDateString("zh-CN")}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm text-[#60a5fa] font-medium group-hover:gap-3 transition-all">
                            阅读全文 <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Regular articles */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {articles.filter(a => !a.featured).map((article) => (
                <motion.div key={article.id} variants={fadeUp}>
                  <Link href={`/articles/${article.id}`}>
                    <div className="glass-card rounded-2xl p-5 cursor-pointer group flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-2 py-0.5 rounded-md bg-[#6366f1]/10 text-[#818cf8] text-xs font-medium">
                            {article.category || "技术"}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock size={12} />
                            {article.readTime || 10} 分钟
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(article.createdAt).toLocaleDateString("zh-CN")}
                          </span>
                        </div>
                        <h3 className="text-base font-display font-semibold text-white group-hover:text-[#60a5fa] transition-colors mb-1">
                          {article.title}
                        </h3>
                        <p className="text-sm text-[#94a3b8] line-clamp-1">
                          {article.summary || article.content.slice(0, 150)}
                        </p>
                      </div>
                      <ArrowRight size={18} className="text-muted-foreground group-hover:text-[#60a5fa] transition-colors flex-shrink-0 ml-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground text-lg">暂无文章</p>
            <p className="text-muted-foreground/60 text-sm mt-2">管理员登录后可以发布新文章</p>
          </div>
        )}
      </section>
    </div>
  );
}
