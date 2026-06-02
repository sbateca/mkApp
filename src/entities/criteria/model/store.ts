import {create} from "zustand";
import {CriteriaStore} from "./types";
import {
  createCriteriaService,
  deleteCriteriaService,
  editCriteriaService,
  getCriteriaByIdService,
  getCriteriasService,
} from "../api/criteriaService";
import {
  CRITERIA_NOT_PROVIDED,
  UNEXPECTED_ERROR,
} from "../../../utils/constants";
import {Criteria} from "./Criteria";

export const useCriteriaStore = create<CriteriaStore>((set) => ({
  criterias: null,
  selectedCriteria: null,
  isLoading: false,
  error: null,

  setSelectedCriteria: (criteria: Criteria | null) =>
    set({selectedCriteria: criteria}),

  setCriterias: (criterias: Criteria[] | null) =>
    set({criterias: criterias ? [...criterias] : null}),

  getCriterias: async () => {
    set({isLoading: true, error: null});
    try {
      const criterias = await getCriteriasService();
      set({criterias: criterias ? [...criterias] : null});
      return criterias;
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
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
      set({isLoading: false});
    }
  },
  createCriteria: async (criteria: Criteria) => {
    set({isLoading: true, error: null});
    try {
      if (!criteria) throw Error(CRITERIA_NOT_PROVIDED);
      return createCriteriaService(criteria);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  editCriteria: async (criteria: Criteria, criteriaId: string) => {
    set({isLoading: true, error: null});
    try {
      if (!criteriaId || !criteria) throw Error(CRITERIA_NOT_PROVIDED);
      return editCriteriaService(criteria, criteriaId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  deleteCriteria: async (criteriaId: string) => {
    set({isLoading: true, error: null});
    try {
      if (!criteriaId) throw Error(CRITERIA_NOT_PROVIDED);
      return deleteCriteriaService(criteriaId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
}));
