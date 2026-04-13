import {create} from "zustand";
import {AnalyteStore} from "./types";
import {Analyte} from "../../../model";
import {getAnalyteByIdService, getAnalytesService} from "../api/analyteService";

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
      return await getAnalytesService();
    } catch (error) {
      set({error: (error as Error).message});
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
      set({error: (error as Error).message});
    } finally {
      set({isLoading: false});
    }
    return null;
  },
}));
