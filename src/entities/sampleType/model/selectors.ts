import {SampleTypeStore} from "./types";

export const selectSamplesTypes = (store: SampleTypeStore) => store.sampleTypes;
export const selectSelectedSampleType = (store: SampleTypeStore) =>
  store.selectedSampleType;
export const selectIsLoadingSampleTypes = (store: SampleTypeStore) =>
  store.isLoading;
export const selectError = (store: SampleTypeStore) => store.error;
export const selectSetSelectedSampleType = (store: SampleTypeStore) =>
  store.setSelectedSampleType;
export const selectSetSampleTypes = (store: SampleTypeStore) =>
  store.setSampleTypes;
export const selectGetSampleTypes = (store: SampleTypeStore) =>
  store.getSampleTypes;
export const selectGetSampleTypeById = (store: SampleTypeStore) =>
  store.getSampleTypeById;
