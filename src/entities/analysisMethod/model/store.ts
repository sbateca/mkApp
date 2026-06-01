import {create} from "zustand";
import {AnalysisMethodStore} from "./types";
import {
  createAnalysisMethodService,
  deleteAnalysisMethodService,
  editAnalysisMethodService,
  getAnalysisMethodByIdService,
  getAnalysisMethodService,
} from "../api/analysisMethodService";
import {AnalysisMethod} from "./AnalysisMethod";
import {
  ANALYSIS_METHOD_NOT_PROVIDED,
  UNEXPECTED_ERROR,
} from "../../../utils/constants";

export const useAnalysisMethodsStore = create<AnalysisMethodStore>((set) => ({
  analysisMethods: null,
  selectedAnalysisMethod: null,
  isLoading: false,
  error: null,

  setAnalysisMethods: (analysisMethods: AnalysisMethod[] | null) =>
    set({analysisMethods: analysisMethods ? [...analysisMethods] : null}),

  setSelectedAnalysisMethod: (analysisMethod: AnalysisMethod | null) =>
    set({selectedAnalysisMethod: analysisMethod}),

  getAnalysisMethods: async () => {
    set({isLoading: true, error: null});
    try {
      const analysisMethods = await getAnalysisMethodService();
      set({analysisMethods: analysisMethods ? [...analysisMethods] : null});
      return analysisMethods;
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  getAnalysisMethodById: async (analysisMethodId: string) => {
    set({isLoading: true, error: null});
    try {
      return await getAnalysisMethodByIdService(analysisMethodId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  createAnalysisMethod: async (analysisMethod: AnalysisMethod) => {
    set({isLoading: true, error: null});
    try {
      if (!analysisMethod) throw Error(ANALYSIS_METHOD_NOT_PROVIDED);
      return createAnalysisMethodService(analysisMethod);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  editAnalysisMethod: async (
    analysisMethod: AnalysisMethod,
    analysisMethodId: string,
  ) => {
    set({isLoading: true, error: null});
    try {
      if (!analysisMethodId || !analysisMethod) {
        throw Error(ANALYSIS_METHOD_NOT_PROVIDED);
      }
      return editAnalysisMethodService(analysisMethod, analysisMethodId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  deleteAnalysisMethod: async (analysisMethodId: string) => {
    set({isLoading: true, error: null});
    try {
      if (!analysisMethodId) throw Error(ANALYSIS_METHOD_NOT_PROVIDED);
      return deleteAnalysisMethodService(analysisMethodId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
}));
