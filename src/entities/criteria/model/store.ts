import {create} from "zustand";
import {CriteriaStore} from "./types";
import {
  getCriteriaByIdService,
  getCriteriasService,
} from "../api/criteriaService";
import {UNEXPECTED_ERROR} from "../../../utils/constants";
import {Criteria} from "./Criteria";

export const useCriteriaStore = create<CriteriaStore>((set) => ({
  criterias: null,
  selectedCriteria: null,
  isLoading: false,
  error: null,

  setSelectedCriteria: (criteria: Criteria | null) =>
    set({selectedCriteria: criteria}),

  setCriterias: (criterias: Criteria[] | null) => set({criterias: criterias}),

  getCriterias: async () => {
    set({isLoading: true, error: null});
    try {
      return await getCriteriasService();
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false, error: null});
    }
  },

  getCriteriaById: async (id: string) => {
    set({isLoading: true, error: null});
    try {
      return await getCriteriaByIdService(id);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false, error: null});
    }
  },
}));
