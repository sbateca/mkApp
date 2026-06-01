import {AnalysisMethod} from "./AnalysisMethod";

export type AnalysisMethodStore = {
  analysisMethods: AnalysisMethod[] | null;
  selectedAnalysisMethod: AnalysisMethod | null;
  setAnalysisMethods: (analysisMethod: AnalysisMethod[] | null) => void;
  setSelectedAnalysisMethod: (analysisMethod: AnalysisMethod | null) => void;
  getAnalysisMethods: () => Promise<AnalysisMethod[] | null>;
  getAnalysisMethodById: (
    analysisMethodId: string,
  ) => Promise<AnalysisMethod | null>;
  createAnalysisMethod: (
    analysisMethod: AnalysisMethod,
  ) => Promise<AnalysisMethod | null>;
  editAnalysisMethod: (
    analysisMethod: AnalysisMethod,
    analysisMethodId: string,
  ) => Promise<AnalysisMethod | null>;
  deleteAnalysisMethod: (
    analysisMethodId: string,
  ) => Promise<AnalysisMethod | null>;
  isLoading: boolean;
  error: string | null;
};
