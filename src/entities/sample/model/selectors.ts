import {SamplesStore} from "./types";

export const selectSamples = (store: SamplesStore) => store.samples;
export const selectSelectedSample = (store: SamplesStore) =>
  store.selectedSample;
export const selectIsLoading = (store: SamplesStore) => store.isLoading;
export const selectError = (store: SamplesStore) => store.error;

export const selectSetSelectedSample = (store: SamplesStore) =>
  store.setSelectedSample;
export const selectGetSamples = (store: SamplesStore) => store.getSamples;
export const selectGetSampleById = (store: SamplesStore) => store.getSampleById;
export const selectCreateSample = (store: SamplesStore) => store.createSample;
export const selectEditSample = (store: SamplesStore) => store.editSample;
export const selectDeleteSample = (store: SamplesStore) => store.deleteSample;
