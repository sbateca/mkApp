import {AnalysisMethod} from "./AnalysisMethod";

export type AnalysisMethodStore = {
  analysisMethods: AnalysisMethod[] | null;
  selectedAnalysisMethod: AnalysisMethod | null;
  setAnalysisMethods: (analysisMethod: AnalysisMethod[] | null) => void;
  setSelectedAnalysisMethod: (analysisMethod: AnalysisMethod) => void;
  getAnalysisMethods: () => Promise<AnalysisMethod[] | null>;
  getAnalysisMethodById: (clientId: string) => Promise<AnalysisMethod | null>;
  isLoading: boolean;
  error: string | null;
};
