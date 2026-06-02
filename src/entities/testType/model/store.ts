import {create} from "zustand";
import {TestTypeStore} from "./types";
import {TestType} from "./TestType";
import {
  createTestTypeService,
  deleteTestTypeService,
  editTestTypeService,
  getTestTypeByIdService,
  getTestTypesService,
} from "../api/testTypeService";
import {
  TEST_TYPE_NOT_PROVIDED,
  UNEXPECTED_ERROR,
} from "../../../utils/constants";

export const useTestTypeStore = create<TestTypeStore>((set) => ({
  testTypes: null,
  error: null,
  isLoading: false,
  selectedTestType: null,
  setTestTypes: (testTypes: TestType[] | null) =>
    set({testTypes: testTypes ? [...testTypes] : null}),
  setSelectedTestType: (testType: TestType | null) =>
    set({selectedTestType: testType}),

  getTestTypes: async () => {
    try {
      set({error: null, isLoading: true});
      const testTypes = await getTestTypesService();
      set({testTypes: testTypes ? [...testTypes] : null});
      return testTypes;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: errorMessage});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  getTestTypeById: async (testTypeId: string) => {
    try {
      set({error: null, isLoading: true});
      const testType = await getTestTypeByIdService(testTypeId);
      set({selectedTestType: testType});
      return testType;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: errorMessage});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  createTestType: async (testType: TestType) => {
    try {
      set({isLoading: true, error: null});
      if (!testType) throw Error(TEST_TYPE_NOT_PROVIDED);
      return createTestTypeService(testType);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: errorMessage});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  editTestType: async (testType: TestType, testTypeId: string) => {
    try {
      set({isLoading: true, error: null});
      if (!testTypeId || !testType) throw Error(TEST_TYPE_NOT_PROVIDED);
      return editTestTypeService(testType, testTypeId);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: errorMessage});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  deleteTestType: async (testTypeId: string) => {
    try {
      set({isLoading: true, error: null});
      if (!testTypeId) throw Error(TEST_TYPE_NOT_PROVIDED);
      return deleteTestTypeService(testTypeId);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: errorMessage});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
}));
