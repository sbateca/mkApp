import {TestTypeStore} from "./types";

export const selectTestTypes = (store: TestTypeStore) => store.testTypes;
export const selectIsLoadingTestTypes = (store: TestTypeStore) =>
  store.isLoading;
export const selectTestTypeError = (store: TestTypeStore) => store.error;
export const selectSelectedTestType = (store: TestTypeStore) =>
  store.selectedTestType;

export const selectGetTestTypes = (store: TestTypeStore) => store.getTestTypes;
export const selectSetTestTypes = (store: TestTypeStore) => store.setTestTypes;
export const selectGetTestTypeById = (store: TestTypeStore) =>
  store.getTestTypeById;
export const selectCreateTestType = (store: TestTypeStore) =>
  store.createTestType;
export const selectEditTestType = (store: TestTypeStore) => store.editTestType;
export const selectDeleteTestType = (store: TestTypeStore) =>
  store.deleteTestType;
