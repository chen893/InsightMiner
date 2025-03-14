import { create } from 'zustand';

// 分析状态类型
export type AnalysisStatus = 'pending' | 'processing' | 'completed' | 'error';

// 分析状态存储接口
interface AnalysisState {
  text: string;
  analysisId: string | null;
  status: AnalysisStatus;
  analysisTime: number;
  setText: (text: string) => void;
  setAnalysisId: (id: string | null) => void;
  setStatus: (status: AnalysisStatus) => void;
  setAnalysisTime: (time: number) => void;
  reset: () => void;
}

// 创建分析状态存储
export const useAnalysisStore = create<AnalysisState>((set) => ({
  text: '',
  analysisId: null,
  status: 'pending',
  analysisTime: 0,
  setText: (text) => set({ text }),
  setAnalysisId: (analysisId) => set({ analysisId }),
  setStatus: (status) => set({ status }),
  setAnalysisTime: (analysisTime) => set({ analysisTime }),
  reset: () =>
    set({ text: '', analysisId: null, status: 'pending', analysisTime: 0 }),
}));
