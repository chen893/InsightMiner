import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <Card className="mx-auto w-full max-w-3xl">
      <div className="p-8">
        <div className="flex flex-col items-center text-center">
          {/* 错误图标 */}
          <div className="relative mb-6">
            <div className="absolute -inset-4 animate-pulse">
              <div className="h-full w-full rounded-full bg-destructive/10"></div>
            </div>
            <div className="relative">
              <i className="fas fa-exclamation-circle text-5xl text-destructive"></i>
            </div>
          </div>

          {/* 错误信息 */}
          <div className="mb-8 space-y-2">
            <h2 className="text-2xl font-semibold text-destructive">
              分析失败
            </h2>
            <p className="max-w-md text-text-medium">{error}</p>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-4">
            <Button
              onClick={onRetry}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              <i className="fas fa-redo-alt mr-2" />
              重新分析
            </Button>
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => window.location.reload()}
            >
              <i className="fas fa-sync-alt mr-2" />
              刷新页面
            </Button>
          </div>

          {/* 帮助提示 */}
          <div className="mt-8 rounded-lg bg-destructive/5 p-4 text-sm text-text-medium">
            <div className="flex items-start space-x-3">
              <i className="fas fa-lightbulb mt-0.5 text-destructive"></i>
              <div className="space-y-2 text-left">
                <p>可以尝试以下解决方案：</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>检查网络连接是否正常</li>
                  <li>确保输入的文本内容完整</li>
                  <li>稍后重试或刷新页面</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
