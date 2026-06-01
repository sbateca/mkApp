import {AnalysisMethodStore} from "./types";

export const selectAnalysisMethods = (store: AnalysisMethodStore) =>
  store.analysisMethods;
export const selectIsLoadingAnalysisMethods = (store: AnalysisMethodStore) =>
  store.isLoading;
export const selectError = (store: AnalysisMethodStore) => store.error;
export const selectSelectedAnalysisMethod = (store: AnalysisMethodStore) =>
  store.selectedAnalysisMethod;

export const selectSetSelectedAnalysisMethod = (store: AnalysisMethodStore) =>
  store.setSelectedAnalysisMethod;
export const selectSetAnalysisMethods = (store: AnalysisMethodStore) =>
  store.setAnalysisMethods;
export const selectGetAnalysisMethods = (store: AnalysisMethodStore) =>
  store.getAnalysisMethods;
export const selectGetAnalysisMethodsById = (store: AnalysisMethodStore) =>
  store.getAnalysisMethodById;
export const selectCreateAnalysisMethod = (store: AnalysisMethodStore) =>
  store.createAnalysisMethod;
export const selectEditAnalysisMethod = (store: AnalysisMethodStore) =>
  store.editAnalysisMethod;
export const selectDeleteAnalysisMethod = (store: AnalysisMethodStore) =>
  store.deleteAnalysisMethod;
