import {create} from "zustand";
import {TestStore} from "./types";
import {Test} from "./Test";
import {
  createTestService,
  deleteTestService,
  editTestService,
  getTestByIdService,
  getTestsService,
} from "../api/testService";
import {UNEXPECTED_ERROR} from "../../../utils/constants";

export const useTestStore = create<TestStore>((set) => ({
  tests: null,
  selectedTest: null,
  isLoading: false,
  error: null,

  setSelectedTest: (test: Test | null) => {
    set({selectedTest: test});
  },

  setTests: (tests: Test[] | null) => {
    set({tests: tests});
  },

  getTests: async () => {
    set({isLoading: true, error: null});
    try {
      const tests = await getTestsService();
      set({tests: tests});
      return tests;
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  getTestById: async (testId: string) => {
    try {
      set({isLoading: true, error: null});
      const test = await getTestByIdService(testId);
      set({selectedTest: test});
      return test;
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  createTest: async (test: Test) => {
    try {
      const newTest = await createTestService(test);
      return newTest;
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  editTest: async (testId: string, test: Test) => {
    try {
      const editedTest = await editTestService(testId, test);
      return editedTest;
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  deleteTest: async (testId: string) => {
    try {
      await deleteTestService(testId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
    } finally {
      set({isLoading: false});
    }
  },
}));
