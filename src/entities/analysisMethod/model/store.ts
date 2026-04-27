import {create} from "zustand";
import {AnalysisMethodStore} from "./types";
import {
  getAnalysisMethodByIdService,
  getAnalysisMethodService,
} from "../api/analysisMethodService";
import {AnalysisMethod} from "./AnalysisMethod";
import {UNEXPECTED_ERROR} from "../../../utils/constants";

export const useAnalysisMethodsStore = create<AnalysisMethodStore>((set) => ({
  analysisMethods: null,
  selectedAnalysisMethod: null,
  isLoading: false,
  error: null,

  setAnalysisMethods: (analysisMethods: AnalysisMethod[] | null) =>
    set({analysisMethods: analysisMethods || null}),

  setSelectedAnalysisMethod: (analysisMethod: AnalysisMethod) =>
    set({selectedAnalysisMethod: analysisMethod}),

  getAnalysisMethods: async () => {
    set({isLoading: true, error: null});
    try {
      return await getAnalysisMethodService();
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  getAnalysisMethodById: async (clientId: string) => {
    set({isLoading: true, error: null});
    try {
      return await getAnalysisMethodByIdService(clientId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
}));
