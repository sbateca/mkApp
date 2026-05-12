import {TestStore} from "./types";

export const selectSetSelectedTest = (store: TestStore) =>
  store.setSelectedTest;
export const selectSetTests = (store: TestStore) => store.setTests;
export const selectSelectedTest = (store: TestStore) => store.selectedTest;
export const selectIsLoadingTests = (store: TestStore) => store.isLoading;
export const selectTests = (store: TestStore) => store.tests;
export const selectGetTests = (store: TestStore) => store.getTests;
export const selectGetTestById = (store: TestStore) => store.getTestById;
export const selectCreateTest = (store: TestStore) => store.createTest;
export const selectEditTest = (store: TestStore) => store.editTest;
export const selectDeleteTest = (store: TestStore) => store.deleteTest;
