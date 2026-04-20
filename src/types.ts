/** 前端使用的数据类型（与静态 JSON / 后端 API 一致） */

export interface FeedItem {
  id: number;
  title: string;
  content: string;
  type: string | null;
  tags: string | null;
  likes: number | null;
  comments: number | null;
  createdAt: string;
}

export interface Article {
  id: number;
  title: string;
  summary: string | null;
  content: string;
  category: string | null;
  tags: string | null;
  coverImage: string | null;
  readTime: number | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  tech: string | null;
  stars: number | null;
  forks: number | null;
  status: string | null;
  link: string | null;
  github: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: number;
  title: string;
  description: string | null;
  bvid: string | null;
  bilibiliUrl: string | null;
  thumbnail: string | null;
  duration: string | null;
  category: string | null;
  views: string | null;
  likes: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SiteData {
  feed: FeedItem[];
  articles: Article[];
  projects: Project[];
  videos: Video[];
}
