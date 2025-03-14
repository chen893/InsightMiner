import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ResultPreview() {
  return (
    <div className="animate-fade-in space-y-6">
      {/* 顶部操作栏 */}
      <div className="flex items-center justify-between">
        <h1 className="text-gradient animate-pulse-glow text-2xl font-bold md:text-3xl">
          分析结果
        </h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="btn-outline transform transition-all duration-300 hover:scale-105"
          >
            <i className="fas fa-history mr-2" />
            保存到历史
          </Button>
          <Button className="btn-primary transform animate-pulse-glow transition-all duration-300 hover:scale-105">
            <i className="fas fa-file-export mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 左侧主要内容 */}
        <div className="animate-slide-up space-y-6 lg:col-span-2">
          {/* 主要发现 */}
          <Card className="card-interactive transition-all duration-300 hover:shadow-hover">
            <div className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <i className="fas fa-lightbulb animate-float text-primary" />
                主要发现
              </h2>
              <div className="space-y-4">
                <div className="transform rounded-lg bg-success/10 p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-success/20">
                  <h3 className="mb-2 font-medium text-success">核心需求</h3>
                  <p className="text-text-medium">
                    用户希望能够快速获取市场洞察，减少人工分析时间
                  </p>
                </div>
                <div className="transform rounded-lg bg-warning/10 p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-warning/20">
                  <h3 className="mb-2 font-medium text-warning">潜在机会</h3>
                  <p className="text-text-medium">
                    开发自动化的数据分析工具，提供可视化的分析结果
                  </p>
                </div>
                <div className="transform rounded-lg bg-info/10 p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-info/20">
                  <h3 className="mb-2 font-medium text-info">市场趋势</h3>
                  <p className="text-text-medium">
                    AI驱动的决策支持工具需求持续增长
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* 详细分析 */}
          <Card className="card-interactive transition-all duration-300 hover:shadow-hover">
            <div className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <i className="fas fa-chart-line animate-float text-primary" />
                详细分析
              </h2>
              <Tabs defaultValue="pain-points" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="pain-points"
                    className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    用户痛点
                  </TabsTrigger>
                  <TabsTrigger
                    value="solutions"
                    className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    解决方案
                  </TabsTrigger>
                  <TabsTrigger
                    value="suggestions"
                    className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    实施建议
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="pain-points" className="mt-4">
                  <ul className="space-y-3 text-text-medium">
                    {[
                      '手动分析数据耗时费力',
                      '难以从大量文本中提取关键信息',
                      '缺乏数据支持的决策依据',
                    ].map((text, index) => (
                      <li
                        key={index}
                        className="flex transform items-start gap-3 transition-all duration-300 hover:translate-x-2"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <i className="fas fa-exclamation-circle mt-1 text-warning" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="solutions" className="mt-4">
                  <ul className="space-y-3 text-text-medium">
                    {[
                      '开发智能文本分析功能',
                      '提供数据可视化展示',
                      '支持批量数据处理',
                    ].map((text, index) => (
                      <li
                        key={index}
                        className="flex transform items-start gap-3 transition-all duration-300 hover:translate-x-2"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <i className="fas fa-check-circle mt-1 text-success" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="suggestions" className="mt-4">
                  <ul className="space-y-3 text-text-medium">
                    {[
                      '优先开发核心分析功能',
                      '通过用户反馈迭代优化',
                      '考虑集成第三方数据源',
                    ].map((text, index) => (
                      <li
                        key={index}
                        className="flex transform items-start gap-3 transition-all duration-300 hover:translate-x-2"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <i className="fas fa-arrow-right mt-1 text-info" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </div>

        {/* 右侧边栏 */}
        <div
          className="animate-slide-up space-y-6"
          style={{ animationDelay: '200ms' }}
        >
          {/* 需求优先级 */}
          <Card className="card-interactive transition-all duration-300 hover:shadow-hover">
            <div className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <i className="fas fa-tasks animate-float text-primary" />
                需求优先级
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full w-0 rounded-full bg-success transition-all duration-1000"
                      style={{ width: '80%', transitionDelay: '500ms' }}
                    />
                  </div>
                  <span className="text-sm text-text-medium">高优先级</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full w-0 rounded-full bg-warning transition-all duration-1000"
                      style={{ width: '60%', transitionDelay: '700ms' }}
                    />
                  </div>
                  <span className="text-sm text-text-medium">中优先级</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full w-0 rounded-full bg-info transition-all duration-1000"
                      style={{ width: '40%', transitionDelay: '900ms' }}
                    />
                  </div>
                  <span className="text-sm text-text-medium">低优先级</span>
                </div>
              </div>
            </div>
          </Card>

          {/* 导出选项 */}
          <Card className="card-interactive transition-all duration-300 hover:shadow-hover">
            <div className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <i className="fas fa-file-export animate-float text-primary" />
                导出选项
              </h2>
              <div className="space-y-3">
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <Button className="w-full bg-primary text-white transition-all hover:bg-primary/90">
                    <i className="fas fa-file-pdf mr-2" />
                    导出PDF报告
                  </Button>
                </div>
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <Button variant="outline" className="w-full transition-all">
                    <i className="fas fa-file-excel mr-2" />
                    导出Excel
                  </Button>
                </div>
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <Button variant="outline" className="w-full transition-all">
                    <i className="fas fa-share-alt mr-2" />
                    分享结果
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* 反馈评分 */}
          <Card className="card-interactive transition-all duration-300 hover:shadow-hover">
            <div className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <i className="fas fa-star animate-float text-primary" />
                分析反馈
              </h2>
              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="transform text-2xl text-warning transition-all duration-300 hover:scale-110 active:scale-90"
                    >
                      <i className="fas fa-star" />
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="请输入您的反馈意见..."
                  className="w-full rounded-lg border border-border p-2 text-sm transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  rows={3}
                />
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <Button className="w-full transition-all">提交反馈</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
