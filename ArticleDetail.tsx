/*
 * Design: Digital Topography — 数字地形学
 * Page: 文章详情 — Markdown 渲染
 */
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, Loader2 } from "lucide-react";
import { Link, useParams } from "wouter";
import { Streamdown } from "streamdown";

export default function ArticleDetail() {
  const params = useParams<{ id: string }>();
  const articleId = parseInt(params.id || "0", 10);
  const { data: article, isLoading, error } = trpc.article.getById.useQuery(
    { id: articleId },
    { enabled: articleId > 0 }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#3b82f6]" size={40} />
      </div>
    );
  }

  if (!article || error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-display font-bold text-white mb-4">文章未找到</h2>
        <p className="text-muted-foreground mb-6">该文章可能已被删除或不存在。</p>
        <Link href="/articles">
          <span className="inline-flex items-center gap-2 text-[#60a5fa] hover:text-white transition-colors cursor-pointer">
            <ArrowLeft size={16} />
            返回文章列表
          </span>
        </Link>
      </div>
    );
  }

  const parsedTags: string[] = article.tags ? (() => { try { return JSON.parse(article.tags); } catch { return []; } })() : [];

  return (
    <div>
      {/* Article Header */}
      <section className="relative -mt-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#060b18] to-background" />
        {/* Decorative contour lines */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 200 Q300 100 600 200 T1200 200" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.5"/>
            <path d="M0 220 Q300 120 600 220 T1200 220" stroke="#3b82f6" strokeWidth="0.8" fill="none" opacity="0.4"/>
            <path d="M0 240 Q300 140 600 240 T1200 240" stroke="#3b82f6" strokeWidth="0.6" fill="none" opacity="0.3"/>
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/articles">
              <span className="inline-flex items-center gap-2 text-[#60a5fa] hover:text-white transition-colors mb-6 cursor-pointer text-sm">
                <ArrowLeft size={16} />
                返回文章列表
              </span>
            </Link>

            <div className="flex items-center gap-3 mb-4 mt-4">
              {article.category && (
                <span className="px-2.5 py-1 rounded-md bg-[#6366f1]/10 text-[#818cf8] text-xs font-medium">
                  {article.category}
                </span>
              )}
              {article.readTime && (
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

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>

            {article.summary && (
              <p className="text-lg text-[#94a3b8] leading-relaxed">
                {article.summary}
              </p>
            )}

            {parsedTags.length > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <Tag size={14} className="text-muted-foreground" />
                {parsedTags.map((tag: string) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-[#3b82f6]/10 text-[#60a5fa] text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl p-8 sm:p-12"
        >
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:text-white
            prose-p:text-[#94a3b8] prose-p:leading-relaxed
            prose-a:text-[#60a5fa] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-code:text-[#60a5fa] prose-code:bg-[#1e293b] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[#0f172a] prose-pre:border prose-pre:border-[#3b82f6]/10
            prose-blockquote:border-[#3b82f6]/30 prose-blockquote:text-[#94a3b8]
            prose-img:rounded-xl
            prose-hr:border-[#3b82f6]/10
          ">
            <Streamdown>{article.content}</Streamdown>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
