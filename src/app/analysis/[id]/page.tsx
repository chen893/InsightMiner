'use client';
import { Usable, useEffect } from 'react';
import * as React from 'react';
import { useRouter } from 'next/navigation'; // 注意这里是 navigation 而不是 router
import { trpc } from '@/utils/trpc';
import { AnalysisStatus, useAnalysisStore } from '@/store/analysisStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function AnalysisResultPage({
  params,
}: {
  params: Usable<{ id: string }>;
}) {
  const router = useRouter();

  const { id: analysisId } = React.use<{ id: string }>(params);

  const { status, setStatus, setAnalysisId } = useAnalysisStore();

  // 获取分析状态
  const { data: statusData } = trpc.analysis.getStatus.useQuery(
    { id: analysisId },
    {
      enabled: !!analysisId,
      refetchInterval:
        status !== 'completed' && status !== 'error' ? 5000 : false,
    }
  );

  // 获取分析详情
  const { data: detailData } = trpc.analysis.getDetail.useQuery(
    { id: analysisId },
    {
      enabled: !!analysisId && (status === 'completed' || status === 'error'),
    }
  );

  // 当ID变化时更新状态
  useEffect(() => {
    if (analysisId) {
      setAnalysisId(analysisId);
    }
  }, [analysisId, setAnalysisId]);

  // 当状态数据变化时更新状态
  useEffect(() => {
    if (statusData?.status) {
      setStatus(statusData.status as unknown as AnalysisStatus);
    }
  }, [statusData, setStatus]);

  // 当WebSocket连接状态变化时显示提示

  // 重新分析
  const handleReanalyze = () => {
    router.push('/analysis');
  };

  // 渲染加载状态
  if (!analysisId || !statusData) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-8">
            <div className="flex h-64 flex-col items-center justify-center">
              <div className="relative mb-6">
                <div className="h-16 w-16 rounded-full border-4 border-primary border-opacity-20"></div>
                <div
                  className="absolute left-0 top-0 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"
                  style={{ animationDuration: '1.5s' }}
                ></div>
              </div>
              <p className="text-lg text-text-medium">正在加载分析数据...</p>
              <p className="mt-2 text-sm text-text-medium">请稍候片刻</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 渲染进行中状态
  if (status === 'pending' || status === 'processing') {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              {/* 加载动画 */}
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-4 border-primary border-opacity-20"></div>
                  <div
                    className="absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-4 border-primary border-t-transparent"
                    style={{ animationDuration: '3s' }}
                  ></div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <i
                      className="fas fa-lightbulb animate-pulse text-2xl text-primary"
                      style={{ animationDuration: '2s' }}
                    ></i>
                  </div>
                </div>
              </div>

              {/* 状态文本 */}
              <h1 className="mb-4 text-2xl font-bold">正在分析中</h1>
              <p className="mb-2 text-text-medium">
                我们正在使用AI技术分析您提供的内容，这可能需要几分钟时间
              </p>
              <p className="mb-8 text-sm text-text-medium">
                请不要关闭页面，分析完成后将自动显示结果
              </p>

              {/* 分析步骤 */}
              <div className="mx-auto max-w-md space-y-4 text-left">
                <div className="flex items-center text-success">
                  <i className="fas fa-check-circle mr-3"></i>
                  <span>文本预处理完成</span>
                </div>
                <div className="flex items-center text-success">
                  <i className="fas fa-check-circle mr-3"></i>
                  <span>关键信息提取完成</span>
                </div>
                <div className="flex items-center text-primary">
                  <i className="fas fa-spinner fa-spin mr-3"></i>
                  <span>需求分析进行中</span>
                </div>
                <div className="flex items-center text-text-medium">
                  <i className="far fa-circle mr-3"></i>
                  <span>生成分析报告</span>
                </div>
              </div>

              {/* 提示卡片 */}
              <div className="mx-auto mt-8 max-w-md overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm">
                <div className="border-b border-primary/10 bg-primary/5 px-6 py-3">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <i className="fas fa-info-circle text-lg"></i>
                    </div>
                    <h3 className="ml-3 font-medium text-primary/90">
                      分析过程说明
                    </h3>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-text-medium">
                    系统将通过以下步骤进行分析：
                  </p>
                  <ul className="mt-3 space-y-2.5 text-sm">
                    {[
                      {
                        step: 1,
                        title: '文本预处理',
                        desc: '清洗和标准化输入文本',
                      },
                      {
                        step: 2,
                        title: '关键信息提取',
                        desc: '识别重要信息点',
                      },
                      {
                        step: 3,
                        title: '需求分析',
                        desc: '使用AI模型分析需求特征',
                      },
                      {
                        step: 4,
                        title: '报告生成',
                        desc: '整理分析结果并生成报告',
                      },
                    ].map((item) => (
                      <li
                        key={item.step}
                        className="flex items-start rounded-lg bg-white/40 p-2 transition-all hover:bg-white/60"
                      >
                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/80 text-xs font-medium text-white">
                          {item.step}
                        </div>
                        <div className="ml-2.5">
                          <span className="font-medium text-primary/80">
                            {item.title}：
                          </span>
                          <span className="text-text-medium">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 取消按钮 */}
              <div className="mt-8">
                <Button
                  variant="ghost"
                  onClick={handleReanalyze}
                  className="hover:text-error text-text-medium"
                >
                  <i className="fas fa-times mr-2"></i>
                  取消分析
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 渲染错误状态
  if (status === 'error') {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <i className="fas fa-exclamation-triangle text-3xl text-red-500" />
                </div>
              </div>
              <h1 className="mb-4 text-2xl font-bold">分析出错</h1>
              <p className="mx-auto mb-6 max-w-md text-text-medium">
                {'处理您的请求时出现问题，请重试'}
              </p>
              <div className="mx-auto mb-8 max-w-md space-y-4 rounded-lg bg-red-50 p-4 text-left">
                <div className="flex items-start">
                  <i className="fas fa-info-circle mr-3 mt-1 text-red-500"></i>
                  <div>
                    <p className="text-sm text-text-medium">可能的原因：</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-text-medium">
                      <li>输入文本格式不正确</li>
                      <li>服务器暂时无法响应</li>
                      <li>分析过程中断</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handleReanalyze}
                  className="bg-primary hover:bg-primary/90"
                >
                  <i className="fas fa-redo mr-2"></i>
                  重新分析
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/history')}
                >
                  <i className="fas fa-history mr-2"></i>
                  查看历史记录
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 渲染结果
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardContent className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">分析结果</h1>
            <Button variant="outline" onClick={handleReanalyze}>
              <i className="fas fa-redo mr-2" />
              重新分析
            </Button>
          </div>

          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="summary">
                <i className="fas fa-chart-pie mr-2" />
                概览
              </TabsTrigger>
              <TabsTrigger value="details">
                <i className="fas fa-list-ul mr-2" />
                详情
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <SummaryCard
                  title="核心需求"
                  icon="fas fa-bullseye"
                  items={detailData?.summary?.coreNeeds || []}
                  color="bg-blue-500"
                />
                <SummaryCard
                  title="潜在机会"
                  icon="fas fa-lightbulb"
                  items={detailData?.summary?.opportunities || []}
                  color="bg-green-500"
                />
                <SummaryCard
                  title="市场趋势"
                  icon="fas fa-chart-line"
                  items={detailData?.summary?.marketTrends || []}
                  color="bg-purple-500"
                />
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <DetailCard
                  title="痛点分析"
                  icon="fas fa-exclamation-circle"
                  items={detailData?.details?.painPoints || []}
                />
                <DetailCard
                  title="解决方案"
                  icon="fas fa-check-circle"
                  items={detailData?.details?.solutions || []}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

// 概览卡片组件
function SummaryCard({
  title,
  icon,
  items,
  color,
}: {
  title: string;
  icon: string;
  items: Array<{ title: string; content: string }>;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center space-x-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${color} text-white`}
        >
          <i className={icon} />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="rounded-md bg-background p-3">
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-text-medium">{item.content}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-text-medium">暂无数据</p>
        )}
      </div>
    </div>
  );
}

// 详情卡片组件
function DetailCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: string;
  items: Array<{ title: string; content: string }>;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center space-x-2">
        <i className={`${icon} text-primary`} />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-text-medium">{item.content}</p>
              {index < items.length - 1 && <Separator className="my-2" />}
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-text-medium">暂无数据</p>
        )}
      </div>
    </div>
  );
}
