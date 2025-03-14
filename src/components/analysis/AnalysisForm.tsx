'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useAnalysisStore } from '@/store/analysisStore';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/navigation'; // 注意这里是 navigation 而不是 router
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export function AnalysisForm() {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { text, setText, setAnalysisId } = useAnalysisStore();
  const router = useRouter();

  // 使用tRPC启动分析
  const startMutation = trpc.analysis.start.useMutation({
    onSuccess: (data) => {
      // console.log('分析已启动:', data);
      setIsSubmitting(false);

      // 保存分析ID到状态
      setAnalysisId(data.id);

      // 显示成功提示
      toast.success('分析已启动', {
        description: '我们正在处理您的请求，请稍候...',
      });

      // 跳转到分析结果页面
      router.push(`/analysis/${data.id}`);
    },
    onError: (error) => {
      console.error('启动分析失败:', error);
      setIsSubmitting(false);

      // 显示错误提示
      toast.error('启动分析失败', {
        description: error.message || '请稍后重试',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error('请输入文本内容');
      return;
    }

    setIsSubmitting(true);

    // 调用tRPC启动分析
    startMutation.mutate({ text });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // 处理文件上传逻辑
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];

      // 检查文件类型
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setText(event.target.result as string);
          }
        };
        reader.readAsText(file);
      } else {
        toast.error('不支持的文件类型', {
          description: '目前仅支持.txt文本文件',
        });
      }
    }
  };

  return (
    <Card className="card-interactive mx-auto w-full max-w-3xl">
      <CardContent className="p-6">
        <h1 className="mb-6 text-2xl font-bold">需求分析</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="analysis-type"
              className="mb-2 block text-sm font-medium text-text-medium"
            >
              分析类型
            </label>
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as 'text' | 'file')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="text"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <i className="fas fa-align-left mr-2" />
                  文本分析
                </TabsTrigger>
                <TabsTrigger
                  value="file"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <i className="fas fa-file-upload mr-2" />
                  文件上传
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-4">
                <div className="space-y-4">
                  <Textarea
                    id="text-input"
                    placeholder="请输入需要分析的文本内容..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[200px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    disabled={isSubmitting}
                  />
                  <div className="text-sm text-text-medium">
                    <i className="fas fa-lightbulb mr-2 text-primary" />
                    提示：输入越详细的描述，分析结果会更准确
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="file" className="mt-4">
                <div
                  className={`group relative cursor-pointer rounded-lg border-2 border-dashed transition-all duration-300 ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-primary/5'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    accept=".txt"
                    disabled={isSubmitting}
                  />
                  <div className="p-8 text-center">
                    <i
                      className={`fas fa-cloud-upload-alt mb-4 text-4xl transition-colors duration-300 ${
                        isDragging
                          ? 'text-primary'
                          : 'text-text-medium group-hover:text-primary'
                      }`}
                    />
                    <p
                      className={`transition-colors duration-300 ${
                        isDragging ? 'text-primary' : 'text-text-medium'
                      }`}
                    >
                      拖拽文件到此处，或
                      <Button variant="link" className="px-1">
                        点击上传
                      </Button>
                    </p>
                    <p className="mt-2 text-sm text-text-medium">
                      支持 .txt 文本文件
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {isSubmitting && (
            <div className="space-y-2">
              <Progress value={30} className="h-2 w-full" />
              <p className="text-center text-sm text-text-medium">
                正在启动分析...
              </p>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-text-medium">
                <i className="fas fa-info-circle mr-1 text-primary" />
                支持单行描述或多行文本输入
              </div>
              {text.length > 0 && (
                <div className="text-sm text-text-medium">
                  <i className="fas fa-text-width mr-1 text-primary" />
                  {text.length} 字
                </div>
              )}
            </div>
            <Button
              type="submit"
              disabled={!text.trim() || isSubmitting}
              className="btn-primary disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2" />
                  处理中...
                </>
              ) : (
                <>
                  <i className="fas fa-robot mr-2" />
                  开始分析
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
