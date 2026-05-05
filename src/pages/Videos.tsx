import { useVideos } from "@/lib/useSiteData";
import { motion } from "framer-motion";
import { Play, Eye, ThumbsUp, ExternalLink, Loader2, Video } from "lucide-react";

const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
const VIDEOS_BG = `${base}hero-bg-zhongshi.png`;

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Videos() {
  const { data: videos, isLoading } = useVideos();

  return (
    <div>
      <section className="relative -mt-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510] via-[#1c1812] to-background" />
        <div
          className="absolute inset-0 bg-cover bg-center z-[1]"
          style={{ backgroundImage: `url(${VIDEOS_BG})` }}
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
              <Video size={20} className="text-primary" />
              <span className="text-sm text-primary font-medium">视频分享</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              视频
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              技术教程、项目演示与经验分享。点击卡片跳转到视频网站观看完整视频。
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
        ) : videos.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {videos.map((video) => (
              <motion.div key={video.id} variants={fadeUp}>
                <a
                  href={video.bilibiliUrl || (video.bvid ? `https://www.bilibili.com/video/${video.bvid}` : "#")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="glass-card rounded-2xl overflow-hidden group cursor-pointer">
                    <div className="relative aspect-video bg-card overflow-hidden">
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Play size={48} className="text-primary" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-[#1a1510] opacity-0 group-hover:opacity-95 transition-opacity duration-300 ease-out flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                          <Play size={24} className="text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </div>
                      {video.duration && (
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-[#1a1510] text-foreground text-xs font-medium">
                          {video.duration}
                        </div>
                      )}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#fb7299]/90 text-white text-xs font-medium flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653z" />
                        </svg>
                        bilibili
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-display font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {video.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {video.views && (
                            <span className="flex items-center gap-1">
                              <Eye size={12} />
                              {video.views}
                            </span>
                          )}
                          {video.likes && (
                            <span className="flex items-center gap-1">
                              <ThumbsUp size={12} />
                              {video.likes}
                            </span>
                          )}
                          {video.category && (
                            <span className="px-2 py-0.5 rounded-md bg-accent text-primary">
                              {video.category}
                            </span>
                          )}
                        </div>
                        <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <Play size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">暂无视频</p>
            <p className="text-muted-foreground text-sm mt-2">可在 public/data/site.json 中配置 Bilibili 视频</p>
          </div>
        )}
      </section>
    </div>
  );
}
