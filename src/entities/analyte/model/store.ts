import {create} from "zustand";
import {AnalyteStore} from "./types";
import {
  createAnalyteService,
  deleteAnalyteService,
  editAnalyteService,
  getAnalyteByIdService,
  getAnalytesByTestTypeIdService,
  getAnalytesService,
} from "../api/analyteService";
import {Analyte} from "./Analyte";
import {ANALYTE_NOT_PROVIDED, UNEXPECTED_ERROR} from "../../../utils/constants";

export const useAnalyteStore = create<AnalyteStore>()((set) => ({
  analytes: null,
  selectedAnalyte: null,
  isLoading: false,
  error: null,

  setSelectedAnalyte: (analyte: Analyte | null) =>
    set({selectedAnalyte: analyte}),

  setAnalytes: (analytes: Analyte[] | null) =>
    set({analytes: analytes ? [...analytes] : null}),

  getAnalytes: async () => {
    set({isLoading: true, error: null});
    try {
      const analytes = await getAnalytesService();
      set({analytes: analytes ? [...analytes] : null});
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

  getAnalytesByTestTypeId: async (testTypeId: string) => {
    set({error: null});
    try {
      return await getAnalytesByTestTypeIdService(testTypeId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    }
  },
  createAnalyte: async (analyte: Analyte) => {
    set({isLoading: true, error: null});
    try {
      if (!analyte) throw Error(ANALYTE_NOT_PROVIDED);
      return createAnalyteService(analyte);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  editAnalyte: async (analyte: Analyte, analyteId: string) => {
    set({isLoading: true, error: null});
    try {
      if (!analyteId || !analyte) throw Error(ANALYTE_NOT_PROVIDED);
      return editAnalyteService(analyte, analyteId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  deleteAnalyte: async (analyteId: string) => {
    set({isLoading: true, error: null});
    try {
      if (!analyteId) throw Error(ANALYTE_NOT_PROVIDED);
      return deleteAnalyteService(analyteId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
}));
