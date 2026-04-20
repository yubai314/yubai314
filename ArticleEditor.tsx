/*
 * Design: Digital Topography — 数字地形学
 * Page: 文章编辑器 — Markdown 在线编辑，仅管理员可用
 */
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, Edit3, Loader2 } from "lucide-react";
import { Link, useParams, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

export default function ArticleEditor() {
  const { user } = useAuth({ redirectOnUnauthenticated: true });
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const isNew = !params.id || params.id === "new";
  const articleId = isNew ? 0 : parseInt(params.id || "0", 10);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [readTime, setReadTime] = useState(10);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const { data: article, isLoading } = trpc.article.getById.useQuery(
    { id: articleId },
    { enabled: articleId > 0 }
  );

  const utils = trpc.useUtils();

  const createMutation = trpc.article.create.useMutation({
    onSuccess: (data) => {
      toast.success("文章创建成功");
      utils.article.list.invalidate();
      utils.article.listAll.invalidate();
      navigate(`/articles/${data.id}`);
    },
    onError: (err) => toast.error(`创建失败: ${err.message}`),
  });

  const updateMutation = trpc.article.update.useMutation({
    onSuccess: () => {
      toast.success("文章更新成功");
      utils.article.list.invalidate();
      utils.article.listAll.invalidate();
      utils.article.getById.invalidate({ id: articleId });
    },
    onError: (err) => toast.error(`更新失败: ${err.message}`),
  });

  useEffect(() => {
    if (article && !isNew) {
      setTitle(article.title);
      setSummary(article.summary || "");
      setContent(article.content);
      setCategory(article.category || "");
      setTags(article.tags || "");
      setReadTime(article.readTime || 10);
      setFeatured(article.featured || false);
      setPublished(article.published || false);
    }
  }, [article, isNew]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("标题和内容不能为空");
      return;
    }

    const data = {
      title: title.trim(),
      summary: summary.trim() || undefined,
      content: content.trim(),
      category: category.trim() || undefined,
      tags: tags.trim() || undefined,
      readTime,
      featured,
      published,
    };

    if (isNew) {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate({ id: articleId, ...data });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (!isNew && isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#3b82f6]" size={40} />
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-display font-bold text-white mb-4">无权访问</h2>
        <p className="text-muted-foreground mb-6">仅管理员可以编辑文章。</p>
        <Link href="/articles">
          <span className="text-[#60a5fa] hover:text-white transition-colors cursor-pointer">
            返回文章列表
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/articles">
              <span className="inline-flex items-center gap-2 text-[#60a5fa] hover:text-white transition-colors cursor-pointer text-sm">
                <ArrowLeft size={16} />
                返回
              </span>
            </Link>
            <h1 className="text-2xl font-display font-bold text-white">
              {isNew ? "新建文章" : "编辑文章"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className="border-[#3b82f6]/20 text-[#60a5fa] hover:bg-[#3b82f6]/10"
            >
              {previewMode ? <Edit3 size={16} /> : <Eye size={16} />}
              <span className="ml-2">{previewMode ? "编辑" : "预览"}</span>
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              <span className="ml-2">保存</span>
            </Button>
          </div>
        </div>

        {/* Metadata */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-muted-foreground mb-1.5">标题</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="文章标题"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-[#3b82f6]/15 text-white placeholder-muted-foreground/50 focus:border-[#3b82f6]/40 focus:outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-muted-foreground mb-1.5">摘要</label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="简短描述（可选）"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-[#3b82f6]/15 text-white placeholder-muted-foreground/50 focus:border-[#3b82f6]/40 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">分类</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="如：前端开发"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-[#3b82f6]/15 text-white placeholder-muted-foreground/50 focus:border-[#3b82f6]/40 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">标签（JSON 数组）</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder='["React", "TypeScript"]'
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-[#3b82f6]/15 text-white placeholder-muted-foreground/50 focus:border-[#3b82f6]/40 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">阅读时间（分钟）</label>
              <input
                type="number"
                value={readTime}
                onChange={(e) => setReadTime(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-[#3b82f6]/15 text-white focus:border-[#3b82f6]/40 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-6 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-[#3b82f6]/30 bg-[#0f172a] text-[#3b82f6] focus:ring-[#3b82f6]/30"
                />
                <span className="text-sm text-[#94a3b8]">精选文章</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 rounded border-[#3b82f6]/30 bg-[#0f172a] text-[#3b82f6] focus:ring-[#3b82f6]/30"
                />
                <span className="text-sm text-[#94a3b8]">发布</span>
              </label>
            </div>
          </div>
        </div>

        {/* Editor / Preview */}
        <div className="glass-card rounded-2xl p-6">
          {previewMode ? (
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:text-white
              prose-p:text-[#94a3b8] prose-p:leading-relaxed
              prose-a:text-[#60a5fa] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:text-[#60a5fa] prose-code:bg-[#1e293b] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-[#0f172a] prose-pre:border prose-pre:border-[#3b82f6]/10
              prose-blockquote:border-[#3b82f6]/30 prose-blockquote:text-[#94a3b8]
              min-h-[400px]
            ">
              {content ? (
                <Streamdown>{content}</Streamdown>
              ) : (
                <p className="text-muted-foreground/50 italic">暂无内容可预览</p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                内容（支持 Markdown）
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="使用 Markdown 语法编写文章内容..."
                rows={20}
                className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-[#3b82f6]/15 text-white placeholder-muted-foreground/50 focus:border-[#3b82f6]/40 focus:outline-none transition-colors font-mono text-sm leading-relaxed resize-y"
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
