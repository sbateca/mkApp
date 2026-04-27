import {create} from "zustand";
import {AnalyteStore} from "./types";
import {getAnalyteByIdService, getAnalytesService} from "../api/analyteService";
import {Analyte} from "./Analyte";
import {UNEXPECTED_ERROR} from "../../../utils/constants";

export const useAnalyteStore = create<AnalyteStore>()((set) => ({
  analytes: null,
  selectedAnalyte: null,
  isLoading: false,
  error: null,

  setSelectedAnalyte: (analyte: Analyte | null) =>
    set({selectedAnalyte: analyte}),

  setAnalytes: (analytes: Analyte[] | null) => set({analytes: analytes}),

  getAnalytes: async () => {
    set({isLoading: true, error: null});
    try {
      const analytes = await getAnalytesService();
      set({analytes: analytes});
      return analytes;
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  getAnalyteById: async (analyteId: string) => {
    set({isLoading: true, error: null});
    try {
      return await getAnalyteByIdService(analyteId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
    } finally {
      set({isLoading: false});
    }
    return null;
  },
}));
