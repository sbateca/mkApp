import {create} from "zustand";
import {AnalysisMethodStore} from "./types";
import {AnalysisMethod} from "../../../model";
import {
  getAnalysisMethodByIdService,
  getAnalysisMethodService,
} from "../../../services";

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
      set({error: (error as Error).message});
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
      set({error: (error as Error).message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
}));
