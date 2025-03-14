import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
// import { prisma } from '../db';
import { analyzeText } from '../services/openai';

export const analysisRouter = router({
  start: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // console.log('start', input);

      // 创建分析记录
      const analysis = await ctx.prisma.analysis.create({
        data: {
          title: '未命名分析',
          inputText: input.text,
          status: 'pending',
        },
      });

      // 异步启动分析过程，不等待其完成
      (async () => {
        try {
          await analyzeText(analysis.id, input.text);
        } catch (error) {
          console.error('分析过程出错:', error);
        }
      })();

      // 立即返回分析ID
      return {
        id: analysis.id,
        status: 'pending',
      };
    }),

  getStatus: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      // 从数据库获取分析状态
      const analysis = await ctx.prisma.analysis.findUnique({
        where: { id: input.id },
        select: { status: true, analysisTime: true },
      });

      if (!analysis) {
        throw new Error('分析记录不存在');
      }

      return {
        status: analysis.status,
        analysisTime: analysis.analysisTime,
      };
    }),

  getDetail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      // 从数据库获取分析详情
      const analysis = await ctx.prisma.analysis.findUnique({
        where: { id: input.id },
        include: { results: true },
      });

      if (!analysis) {
        throw new Error('分析记录不存在');
      }

      // 如果分析尚未完成，返回当前状态
      if (analysis.status !== 'completed') {
        return {
          status: analysis.status,
          results: [],
        };
      }

      // 整理分析结果
      const coreNeeds = analysis.results
        .filter((r) => r.type === 'core_need')
        .map((r) => ({ title: r.title, content: r.content }));

      const opportunities = analysis.results
        .filter((r) => r.type === 'potential_opportunity')
        .map((r) => ({ title: r.title, content: r.content }));

      const marketTrends = analysis.results
        .filter((r) => r.type === 'market_trend')
        .map((r) => ({ title: r.title, content: r.content }));

      const painPoints = analysis.results
        .filter((r) => r.type === 'pain_point')
        .map((r) => ({ title: r.title, content: r.content }));

      const solutions = analysis.results
        .filter((r) => r.type === 'solution')
        .map((r) => ({ title: r.title, content: r.content }));

      return {
        status: 'completed',
        summary: {
          coreNeeds,
          opportunities,
          marketTrends,
        },
        details: {
          painPoints,
          solutions,
          implementation: [], // 可以根据需要添加实施步骤
        },
        priority: {
          high: coreNeeds.length,
          medium: opportunities.length,
          low: marketTrends.length,
        },
      };
    }),

  getSummary: publicProcedure
    .input(z.object({ analysisId: z.string() }))
    .query(async ({ ctx, input }) => {
      const analysis = await ctx.prisma.analysis.findUnique({
        where: { id: input.analysisId },
        include: { results: true },
      });

      if (!analysis) {
        throw new Error('分析记录不存在');
      }

      const stats = {
        coreNeeds: analysis.results.filter((r) => r.type === 'core_need')
          .length,
        opportunities: analysis.results.filter(
          (r) => r.type === 'potential_opportunity'
        ).length,
        solutions: analysis.results.filter((r) => r.type === 'market_trend')
          .length,
      };

      const topFindings = analysis.results.slice(0, 3).map((r) => ({
        title: r.title,
        content: r.content,
        type: r.type,
      }));

      return {
        code: 0,
        message: '获取概览成功',
        data: {
          stats,
          topFindings,
        },
      };
    }),

  search: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().default(10),
        keyword: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        type: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        isBookmarked: z.boolean().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where = {
        ...(input.keyword
          ? {
              OR: [
                { title: { contains: input.keyword } },
                { inputText: { contains: input.keyword } },
              ],
            }
          : {}),
        ...(input.startDate && input.endDate
          ? {
              createdAt: {
                gte: input.startDate,
                lte: input.endDate,
              },
            }
          : {}),
        ...(input.isBookmarked !== undefined
          ? { isBookmarked: input.isBookmarked }
          : {}),
        ...(input.type?.length
          ? {
              results: {
                some: {
                  type: { in: input.type },
                },
              },
            }
          : {}),
        ...(input.tags?.length
          ? {
              tags: {
                some: {
                  name: { in: input.tags },
                },
              },
            }
          : {}),
      };

      const [total, items] = await Promise.all([
        ctx.prisma.analysis.count({ where }),
        ctx.prisma.analysis.findMany({
          where,
          include: { results: true },
          skip: (input.page - 1) * input.pageSize,
          take: input.pageSize,
          orderBy: { createdAt: 'desc' },
        }),
      ]);

      return { total, items };
    }),

  update: publicProcedure
    .input(
      z.object({
        analysisId: z.string(),
        title: z.string().optional(),
        isBookmarked: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const analysis = await ctx.prisma.analysis.update({
        where: { id: input.analysisId },
        data: {
          ...(input.title !== undefined ? { title: input.title } : {}),
          ...(input.isBookmarked !== undefined
            ? { isBookmarked: input.isBookmarked }
            : {}),
        },
      });

      return {
        code: 0,
        message: '更新成功',
        data: analysis,
      };
    }),

  share: publicProcedure
    .input(
      z.object({
        analysisId: z.string(),
        expiresIn: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const shareLink = `${process.env.APP_URL}/share/${input.analysisId}`;
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + (input.expiresIn || 24));

      // 更新分析记录但不使用返回值
      await ctx.prisma.analysis.update({
        where: { id: input.analysisId },
        data: {
          shareLink: shareLink,
        },
      });

      return {
        code: 0,
        message: '分享成功',
        data: {
          shareLink,
          expiresAt,
        },
      };
    }),
});
