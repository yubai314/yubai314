/** 全站 hero 区背景图路径（放在 public 目录下，如 public/hero-bg.png） */
const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
export const HERO_BG_URL = `${base}hero-bg.png`;

/** 当 hero-bg.png 不存在时的备用图（与首页 fallback 一致，保证各页都有背景） */
export const FALLBACK_HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663287023784/FU8KrTQkmJEEcfhuSWS3mH/hero-bg-Sg76HaQCVYyNzL24v4tzb5.webp";
