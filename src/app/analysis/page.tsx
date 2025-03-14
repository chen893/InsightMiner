'use client';

import { AnalysisForm } from '@/components/analysis/AnalysisForm';
import { ResultPreview } from '@/components/analysis/ResultPreview';
import { LoadingState } from '@/components/states/LoadingState';
import { ErrorState } from '@/components/states/ErrorState';
import { trpc } from '@/utils/trpc';
import { useAnalysisStore } from '@/store/analysisStore';

export default function AnalysisPage() {
  const {
    status,
    error,
    mutate: startAnalysis,
    // 重试,
  } = trpc.analysis.start.useMutation();
  const { text } = useAnalysisStore();

  return (
    <div>
      <div className="relative min-h-screen">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

        {/* 主要内容 */}
        <div className="container relative">
          <div className="section-spacing">
            {status === 'loading' ? (
              <div className="animate-fade-in">
                <LoadingState />
              </div>
            ) : status === 'error' ? (
              <div className="animate-slide-up">
                <ErrorState
                  error={error?.message || '分析失败'}
                  onRetry={() => startAnalysis({ text })}
                />
              </div>
            ) : status === 'success' ? (
              <div className="animate-fade-in">
                <ResultPreview />
              </div>
            ) : (
              <div className="animate-slide-up space-y-8">
                <div className="text-center">
                  <h1 className="text-gradient mb-4 text-3xl font-bold md:text-4xl">
                    开始您的需求分析
                  </h1>
                  <p className="mx-auto max-w-2xl text-text-medium">
                    输入您想要分析的文本内容，我们的 AI
                    将帮助您提炼关键需求并生成分析报告
                  </p>
                </div>
                <AnalysisForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
