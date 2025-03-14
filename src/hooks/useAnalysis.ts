import { useCallback } from 'react';
import { trpc } from '@/utils/trpc';
import { useAnalysisStore } from '@/store/analysisStore';

export function useAnalysis() {
  // , setResult, setError
  const { text, setStatus } = useAnalysisStore();

  const startMutation = trpc.analysis.start.useMutation();
  const statusQuery = trpc.analysis.getStatus.useQuery;
  const detailQuery = trpc.analysis.getDetail.useQuery;

  const startAnalysis = useCallback(async () => {
    // setStatus('loading');
    // setError(null);

    try {
      // 启动分析
      const result = await startMutation.mutateAsync({ text });

      if (!result) {
        throw new Error('分析启动失败');
      }

      // 轮询获取分析状态
      const pollStatus = async () => {
        const { data: statusResult } = await statusQuery({
          id: result.id,
        });

        if (!statusResult) {
          throw new Error('获取分析状态失败');
        }

        if (statusResult.status === 'completed') {
          // 获取分析结果
          const { data: analysisResult } = await detailQuery({
            id: result.id,
          });

          if (!analysisResult) {
            throw new Error('获取分析结果失败');
          }

          // setStatus('success');
          // setResult(analysisResult);
        } else if (statusResult.status === 'failed') {
          throw new Error('分析失败');
        } else {
          // 继续轮询
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await pollStatus();
        }
      };

      await pollStatus();
    } catch (error) {
      if (error) {
        setStatus('error');
      }

      // console.log(_error);
      // setError(error instanceof Error ? error.message : '分析失败');
    }
  }, [
    text,
    setStatus,
    // setResult: () => {},
    // setError: () => {},
    startMutation,
    statusQuery,
    detailQuery,
  ]);

  return {
    startAnalysis,
    isLoading: startMutation.isLoading,
  };
}
