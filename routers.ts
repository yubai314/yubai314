import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Articles ────────────────────────────────────────────────────
  article: router({
    list: publicProcedure.query(async () => {
      return db.getPublishedArticles();
    }),
    listAll: adminProcedure.query(async () => {
      return db.getAllArticles();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getArticleById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        summary: z.string().optional(),
        content: z.string().min(1),
        category: z.string().optional(),
        tags: z.string().optional(),
        coverImage: z.string().optional(),
        readTime: z.number().optional(),
        featured: z.boolean().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const id = await db.createArticle({ ...input, authorId: ctx.user.id });
        return { id };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        summary: z.string().optional(),
        content: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        coverImage: z.string().optional(),
        readTime: z.number().optional(),
        featured: z.boolean().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateArticle(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteArticle(input.id);
        return { success: true };
      }),
  }),

  // ─── Feed Items ──────────────────────────────────────────────────
  feed: router({
    list: publicProcedure.query(async () => {
      return db.getPublishedFeedItems();
    }),
    listAll: adminProcedure.query(async () => {
      return db.getAllFeedItems();
    }),
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        type: z.string().optional(),
        tags: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const id = await db.createFeedItem({ ...input, authorId: ctx.user.id });
        return { id };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        type: z.string().optional(),
        tags: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateFeedItem(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteFeedItem(input.id);
        return { success: true };
      }),
  }),

  // ─── Projects ────────────────────────────────────────────────────
  project: router({
    list: publicProcedure.query(async () => {
      return db.getPublishedProjects();
    }),
    listAll: adminProcedure.query(async () => {
      return db.getAllProjects();
    }),
    create: adminProcedure
      .input(z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        tech: z.string().optional(),
        stars: z.number().optional(),
        forks: z.number().optional(),
        status: z.string().optional(),
        link: z.string().optional(),
        github: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createProject(input);
        return { id };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        tech: z.string().optional(),
        stars: z.number().optional(),
        forks: z.number().optional(),
        status: z.string().optional(),
        link: z.string().optional(),
        github: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateProject(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteProject(input.id);
        return { success: true };
      }),
  }),

  // ─── Videos ──────────────────────────────────────────────────────
  video: router({
    list: publicProcedure.query(async () => {
      return db.getPublishedVideos();
    }),
    listAll: adminProcedure.query(async () => {
      return db.getAllVideos();
    }),
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        bvid: z.string().optional(),
        bilibiliUrl: z.string().optional(),
        thumbnail: z.string().optional(),
        duration: z.string().optional(),
        category: z.string().optional(),
        views: z.string().optional(),
        likes: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createVideo(input);
        return { id };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        bvid: z.string().optional(),
        bilibiliUrl: z.string().optional(),
        thumbnail: z.string().optional(),
        duration: z.string().optional(),
        category: z.string().optional(),
        views: z.string().optional(),
        likes: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateVideo(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteVideo(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
