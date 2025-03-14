import { Card } from '@/components/ui/card';

export function LoadingState() {
  return (
    <Card className="mx-auto w-full max-w-3xl">
      <div className="p-6">
        <div className="flex items-center justify-center">
          <div className="relative">
            {/* 加载动画 */}
            <div className="absolute -inset-4">
              <div className="h-full w-full animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
            <div className="relative">
              <i className="fas fa-robot animate-pulse text-4xl text-primary"></i>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {/* 加载提示 */}
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold">正在分析中...</h2>
            <p className="text-text-medium">
              AI 正在处理您的文本，这可能需要几秒钟时间
            </p>
          </div>

          {/* 加载进度条 */}
          <div className="space-y-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-primary"></div>
            </div>
            <div className="flex justify-between text-sm text-text-medium">
              <span>正在处理文本</span>
              <span>50%</span>
            </div>
          </div>

          {/* 加载提示列表 */}
          <div className="space-y-3">
            {[
              '正在分析文本内容...',
              '提取关键需求点...',
              '生成分析报告...',
            ].map((tip, index) => (
              <div
                key={tip}
                className="flex items-center space-x-3 text-sm text-text-medium"
                style={{
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
