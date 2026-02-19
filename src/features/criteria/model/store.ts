import {create} from "zustand";
import {CriteriaStore} from "./types";
import {Criteria} from "../../../model";
import {getCriteriaByIdService, getCriteriasService} from "../../../services";

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
      set({error: (error as Error).message});
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
      set({error: (error as Error).message});
      return null;
    } finally {
      set({isLoading: false, error: null});
    }
  },
}));
