import {CriteriaStore} from "./types";

export const selectCriterias = (store: CriteriaStore) => store.criterias;
export const selectSelectedCriteria = (store: CriteriaStore) =>
  store.selectedCriteria;
export const selectIsLoadingCriterias = (store: CriteriaStore) =>
  store.isLoading;
export const selectError = (store: CriteriaStore) => store.error;
export const selectSetSelectedCriteria = (store: CriteriaStore) =>
  store.setSelectedCriteria;
export const selectSetCriterias = (store: CriteriaStore) => store.setCriterias;
export const selectGetCriterias = (store: CriteriaStore) => store.getCriterias;
export const selectGetCriteriaById = (store: CriteriaStore) =>
  store.getCriteriaById;
