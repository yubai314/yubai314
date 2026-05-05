import { useArticle } from "@/lib/useSiteData";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, Loader2 } from "lucide-react";
import { Link, useParams } from "wouter";
import ReactMarkdown from "react-markdown";

const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
const ARTICLES_BG = `${base}hero-bg-zhongshi.png`;

function parseTags(tags: string | null): string[] {
  if (!tags) return [];
  try {
    return JSON.parse(tags);
  } catch {
    return [];
  }
}

export default function ArticleDetail() {
  const params = useParams<{ id: string }>();
  const articleId = parseInt(params.id || "0", 10);
  const { data: article, isLoading, error } = useArticle(articleId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!article || error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">文章未找到</h2>
        <p className="text-muted-foreground mb-6">该文章可能已被删除或不存在。</p>
        <Link href="/articles">
          <span className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeft size={16} />
            返回文章列表
          </span>
        </Link>
      </div>
    );
  }

  const parsedTags = parseTags(article.tags);

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
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link href="/articles">
              <span className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors mb-6 cursor-pointer text-sm">
                <ArrowLeft size={16} />
                返回文章列表
              </span>
            </Link>
            <div className="flex items-center gap-3 mb-4 mt-4">
              {article.category && (
                <span className="px-2.5 py-1 rounded-md bg-accent text-primary text-xs font-medium">
                  {article.category}
                </span>
              )}
              {article.readTime != null && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} />
                  {article.readTime} 分钟
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={12} />
                {new Date(article.createdAt).toLocaleDateString("zh-CN")}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>
            {article.summary && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {article.summary}
              </p>
            )}
            {parsedTags.length > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <Tag size={14} className="text-muted-foreground" />
                {parsedTags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-accent text-primary text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
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
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
