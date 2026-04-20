/**
 * 前后端分离：数据来源为静态 JSON（GitHub Pages）或可配置 API。
 * 优先使用 VITE_API_URL，否则从 /data/site.json 加载。
 */
import type { SiteData, Article, FeedItem, Project, Video } from "@/types";

const DATA_PATH = "/data/site.json";
let cached: SiteData | null = null;

async function fetchSiteData(): Promise<SiteData> {
  if (cached) return cached;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    const res = await fetch(`${apiUrl}/api/site`);
    if (!res.ok) throw new Error("Failed to load site data");
    cached = await res.json();
    return cached!;
  }
  const res = await fetch(`${base}${DATA_PATH}`);
  if (!res.ok) throw new Error("Failed to load site data");
  cached = await res.json();
  return cached!;
}

export async function getFeed(): Promise<FeedItem[]> {
  const data = await fetchSiteData();
  return data.feed ?? [];
}

/** 首页聚合：文章、视频、项目按时间排序，不限制数量 */
export interface AggregatedFeedItem {
  id: string;
  title: string;
  content: string;
  type: "article" | "video" | "project";
  createdAt: string;
  href: string;
  tags?: string[];
}

export async function getAggregatedFeed(): Promise<AggregatedFeedItem[]> {
  const data = await fetchSiteData();
  const items: AggregatedFeedItem[] = [];
  const articles = (data.articles ?? []).filter((a) => a.published);
  const projects = (data.projects ?? []).filter((p) => p.published);
  const videos = (data.videos ?? []).filter((v) => v.published);
  articles.forEach((a) => {
    items.push({
      id: `article-${a.id}`,
      title: a.title,
      content: a.summary || a.content.slice(0, 200),
      type: "article",
      createdAt: a.createdAt,
      href: `/articles/${a.id}`,
      tags: a.category ? [a.category] : undefined,
    });
  });
  projects.forEach((p) => {
    items.push({
      id: `project-${p.id}`,
      title: p.name,
      content: p.description || "",
      type: "project",
      createdAt: p.createdAt || p.updatedAt,
      href: `/projects/${p.id}`,
      tags: p.tech ? (() => { try { return JSON.parse(p.tech); } catch { return []; } })() : undefined,
    });
  });
  videos.forEach((v) => {
    items.push({
      id: `video-${v.id}`,
      title: v.title,
      content: v.description || "",
      type: "video",
      createdAt: v.createdAt || v.updatedAt,
      href: (v.bilibiliUrl && v.bilibiliUrl.startsWith("http") ? v.bilibiliUrl : v.bvid ? `https://www.bilibili.com/video/${v.bvid}` : "") || "#",
      tags: v.category ? [v.category] : undefined,
    });
  });
  items.sort((a, b) => {
    const ta = Date.parse(a.createdAt);
    const tb = Date.parse(b.createdAt);
    return (Number.isFinite(tb) ? tb : 0) - (Number.isFinite(ta) ? ta : 0);
  });
  return items;
}

export async function getArticles(): Promise<Article[]> {
  const data = await fetchSiteData();
  return (data.articles ?? [])
    .filter((a) => a.published)
    .slice()
    .sort((a, b) => {
      const ta = Date.parse(a.createdAt);
      const tb = Date.parse(b.createdAt);
      return (Number.isFinite(tb) ? tb : 0) - (Number.isFinite(ta) ? ta : 0);
    });
}

export async function getArticleById(id: number): Promise<Article | null> {
  const data = await fetchSiteData();
  const a = (data.articles ?? []).find((x) => x.id === id && x.published);
  return a ?? null;
}

export async function getProjects(): Promise<Project[]> {
  const data = await fetchSiteData();
  return (data.projects ?? []).filter((p) => p.published);
}

export async function getProjectById(id: number): Promise<Project | null> {
  const data = await fetchSiteData();
  const p = (data.projects ?? []).find((x) => x.id === id && x.published);
  return p ?? null;
}

export async function getVideos(): Promise<Video[]> {
  const data = await fetchSiteData();
  return (data.videos ?? []).filter((v) => v.published);
}

/** 预加载全部数据（用于 SPA 内多处使用，只请求一次） */
export function preloadSiteData(): Promise<SiteData> {
  return fetchSiteData();
}
