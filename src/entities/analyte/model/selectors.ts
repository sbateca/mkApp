import {AnalyteStore} from "./types";

export const selectAnalytes = (store: AnalyteStore) => store.analytes;
export const selectSelectedAnaliye = (store: AnalyteStore) =>
  store.selectedAnalyte;
export const selectIsLoadingAnalytes = (store: AnalyteStore) => store.isLoading;
export const selectError = (store: AnalyteStore) => store.error;
export const selectSetSelectedAnalyte = (store: AnalyteStore) =>
  store.setSelectedAnalyte;
export const selectSetAnalytes = (store: AnalyteStore) => store.setAnalytes;
export const selectGetAnalytes = (store: AnalyteStore) => store.getAnalytes;
export const selectGetAnalyteById = (store: AnalyteStore) =>
  store.getAnalyteById;
