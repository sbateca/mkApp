import {Test} from "./Test";

export type TestStore = {
  tests: Test[] | null;
  selectedTest: Test | null;
  isLoading: boolean;
  error: string | null;
  setTests: (tests: Test[] | null) => void;
  setSelectedTest: (test: Test | null) => void;
  getTests: () => Promise<Test[] | null>;
  getTestById: (testId: string) => Promise<Test | null>;
  createTest: (test: Test) => Promise<Test | null>;
  editTest: (testId: string, test: Test) => Promise<Test | null>;
  deleteTest: (testId: string) => Promise<void>;
};
