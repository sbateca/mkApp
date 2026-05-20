import {create} from "zustand";
import {TestTypeStore} from "./types";
import {TestType} from "./TestType";
import {
  createTestTypeService,
  editTestTypeService,
  getTestTypeByIdService,
  getTestTypesService,
} from "../api/testTypeService";
import {UNEXPECTED_ERROR} from "../../../utils/constants";
import {deleteTestService} from "../../test/api/testService";

export const useTestTypeStore = create<TestTypeStore>((set) => ({
  testTypes: null,
  error: null,
  isLoading: false,
  selectedTestType: null,
  setTestTypes: (testTypes: TestType[] | null) => set({testTypes}),

  getTestTypes: async () => {
    try {
      set({error: null, isLoading: true});
      const testTypes = await getTestTypesService();
      set({testTypes});
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
      const newTestType = await createTestTypeService(testType);
      return newTestType;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: errorMessage});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  editTestType: async (testTypeId: string, testType: TestType) => {
    try {
      set({isLoading: true, error: null});
      const updatedTestType = await editTestTypeService(testTypeId, testType);
      return updatedTestType;
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
      await deleteTestService(testTypeId);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: errorMessage});
    } finally {
      set({isLoading: false});
    }
  },
}));
