import {Criteria} from "../../../model";

export type CriteriaStore = {
  criterias: Criteria[] | null;
  selectedCriteria: Criteria | null;
  isLoading: boolean;
  error: string | null;
  setSelectedCriteria: (criteria: Criteria | null) => void;
  setCriterias: (criteria: Criteria[] | null) => void;
  getCriterias: () => Promise<Criteria[] | null>;
  getCriteriaById: (id: string) => Promise<Criteria | null>;
};
