import {TestType} from "./TestType";

export type TestTypeStore = {
  testTypes: TestType[] | null;
  selectedTestType: TestType | null;
  error: string | null;
  isLoading: boolean;
  getTestTypes: () => Promise<TestType[] | null>;
  setTestTypes: (testTypes: TestType[] | null) => void;
  getTestTypeById: (testTypeId: string) => Promise<TestType | null>;
  createTestType: (testType: TestType) => Promise<TestType | null>;
  editTestType: (
    testTypeId: string,
    testType: TestType,
  ) => Promise<TestType | null>;
  deleteTestType: (testTypeId: string) => Promise<void>;
};
