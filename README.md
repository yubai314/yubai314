# 天机阁 — 个人网站（前后端分离 · GitHub Pages）

基于 [ideas.md](./ideas.md) 中的 **Digital Topography（数字地形学）** 方案实现的个人站点，前后端分离，前端可单独部署在 GitHub Pages。

## 功能

- **动态**：首页 Feed 流
- **关于**：个人简介、技能、经历
- **文章**：列表 + 详情（Markdown 渲染）
- **视频**：Bilibili 卡片
- **项目**：开源项目展示

数据来源：

- **静态模式（默认）**：读取 `public/data/site.json`，无需后端。
- **API 模式**：设置环境变量 `VITE_API_URL` 指向自建 API（需提供 `GET /api/site` 返回与 `site.json` 同结构 JSON）。

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:5173

## 构建与预览

```bash
npm run build
npm run preview
```

构建产物在 `dist/`，内含 `index.html` 与复制生成的 `404.html`（用于 GitHub Pages SPA 回退）。

## 部署到 GitHub Pages

### 部署到 gtr4321/Infinite-Loop

1. **在仓库开启 Pages**  
   打开 [Settings → Pages](https://github.com/gtr4321/Infinite-Loop/settings/pages)，**Source** 选择 **GitHub Actions**，保存。

2. **在本地项目目录执行**（已克隆或已有本仓库代码时）：

   ```bash
   git init
   git add .
   git commit -m "feat: 天机阁静态站，支持 GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/gtr4321/Infinite-Loop.git
   git pull origin main --allow-unrelated-histories
   git push -u origin main
   ```

   若远程已有内容且你希望**完全用本地覆盖**，可最后一步改为：

   ```bash
   git push -u origin main --force
   ```

3. **查看部署**  
   打开 [Actions](https://github.com/gtr4321/Infinite-Loop/actions)，等 “Deploy to GitHub Pages” 跑绿。站点地址（务必带末尾斜杠）：

   **https://gtr4321.github.io/Infinite-Loop/**

**若仍 404 或 Actions 报错 “Get Pages site failed”**：  
- 必须到 [Settings → Pages](https://github.com/gtr4321/Infinite-Loop/settings/pages)，在 **Build and deployment** 里将 **Source** 选为 **GitHub Actions**（不是 Deploy from a branch），保存。保存后重新跑一次 workflow 或再 push 一次。  
- 在 [Actions](https://github.com/gtr4321/Infinite-Loop/actions) 中查看最近一次 “Deploy to GitHub Pages” 是否成功；若失败可点进查看日志。  
- 若启用了 Environment 审批，需在 **Settings → Environments → github-pages** 中批准首次部署。

---

通用说明：若仓库名不是 `用户名.github.io`，构建时会自动使用 `base: '/仓库名/'`。

## 更新内容（静态模式）

直接编辑 **`public/data/site.json`**：

- `feed`：首页动态
- `articles`：文章列表与详情（`content` 支持 Markdown）
- `projects`：项目列表
- `videos`：Bilibili 视频（`bvid` 或 `bilibiliUrl`）

保存后提交并推送，重新执行部署即可。

## 技术栈

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- wouter（路由）
- framer-motion（动效）
- react-markdown（文章正文）

## 项目结构（前端）

```
├── public/
│   └── data/
│       └── site.json       # 静态数据（可替换为 API）
├── src/
│   ├── components/         # 布局等
│   ├── lib/
│   │   ├── data.ts         # 数据获取（静态/API）
│   │   └── useSiteData.ts  # 数据 hooks
│   ├── pages/              # 页面组件
│   └── types.ts            # 类型定义
├── .github/workflows/
│   └── deploy-gh-pages.yml # 自动部署
└── vite.config.ts          # base 等配置
```

## 可选：接入自建后端

若后续需要后台管理（登录、编辑文章等），可单独部署后端服务，并保证：

- 提供 `GET /api/site` 返回与 `site.json` 结构一致的 JSON。
- 构建前端时设置 `VITE_API_URL=https://你的API域名`，前端将从此 API 拉取数据而非静态 JSON。
