import { useArticles } from "@/lib/useSiteData";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";

const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
const ARTICLES_BG = `${base}hero-bg-zhongshi.png`;

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ArticleCard({ article }: { article: { id: number; title: string; summary: string | null; content: string; category: string | null; readTime: number | null; featured: boolean; createdAt: string } }) {
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="glass-card rounded-2xl p-8 h-full cursor-pointer group relative overflow-hidden">
        {article.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 rounded-md bg-accent border border-border text-primary text-xs font-medium">
              精选
            </span>
          </div>
        )}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2.5 py-1 rounded-md bg-accent text-primary text-xs font-medium">
            {article.category || "技术"}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={12} />
            {article.readTime ?? 10} 分钟
          </span>
        </div>
        <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200 leading-snug">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
          {article.summary || article.content.slice(0, 200)}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {new Date(article.createdAt).toLocaleDateString("zh-CN")}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-primary font-medium group-hover:gap-3 transition-all duration-200">
            阅读全文 <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Articles() {
  const { data: articles, isLoading } = useArticles();

  return (
    <div>
      <section className="relative -mt-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510] via-[#1c1812] to-background" />
        <div
          className="absolute inset-0 bg-cover bg-center z-[1]"
          style={{ backgroundImage: `url(${ARTICLES_BG})` }}
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
              <BookOpen size={20} className="text-primary" />
              <span className="text-sm text-primary font-medium">技术博客</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              文章
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              深入技术细节，分享实践经验。涵盖前端开发、人工智能、系统设计等多个领域。
            </p>
          </motion.div>
        </div>
        {/* 底部渐变遮罩：从透明过渡到页面背景，与内容区融合（约 80–120px） */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 z-[3] pointer-events-none hero-bottom-fade"
          aria-hidden
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : articles.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {articles.map((article) => (
              <motion.div key={article.id} variants={fadeUp}>
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">暂无文章</p>
            <p className="text-muted-foreground text-sm mt-2">可在 public/data/site.json 中配置文章</p>
          </div>
        )}
      </section>
    </div>
  );
}
