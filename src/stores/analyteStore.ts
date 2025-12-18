import {create} from "zustand";
import {Analyte} from "../model";
import {getAnalyteByIdService, getAnalytesService} from "../services";

interface AnalyteStore {
  analytes: Analyte[] | null;
  selectedAnalyte: Analyte | null;
  setSelectedAnalyte: (analyte: Analyte | null) => void;
  getAnalytes: () => Promise<void>;
  getAnalyteById: (analyteId: string) => Promise<Analyte | null>;
  isLoading: boolean;
  error: string | null;
}

const useAnalyteStore = create<AnalyteStore>()((set) => ({
  analytes: null,
  selectedAnalyte: null,
  isLoading: false,
  error: null,

  setSelectedAnalyte: (analyte: Analyte | null) =>
    set({selectedAnalyte: analyte}),

  getAnalytes: async () => {
    try {
      set({isLoading: true});
      const analytesResponse = await getAnalytesService();

      if (analytesResponse !== null) {
        set({analytes: analytesResponse});
      }
    } catch (error) {
      set({error: (error as Error).message});
    } finally {
      set({isLoading: false});
    }
  },

  getAnalyteById: async (analyteId: string) => {
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

export default useAnalyteStore;
