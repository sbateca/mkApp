import EnvManager from "../../../config/EnvManager";
import {apiClient} from "../../../shared/api/apliClient";
import {ELEMENT_NOT_FOUND_MESSAGE} from "../../../utils/constants";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";
import {axiosResponseToTests} from "../lib/testMappers";
import {Test} from "../model/Test";

export const getTestsService = async (): Promise<Test[]> => {
  const response = await apiClient.get<Test[]>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TESTS}`,
  );
  const tests = axiosResponseToTests(response);
  return tests;
};

export const getTestByIdService = async (testId: string) => {
  const response = await apiClient.get<Test>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TESTS}/${testId}`,
  );
  const test = response.data as Test;
  return test;
};

export const createTestService = async (test: Test) => {
  const response = await apiClient.post<Test>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TESTS}`,
    test,
  );
  return response.data || null;
};

export const editTestService = async (
  testId: string,
  test: Test,
): Promise<Test | null> => {
  const retrievedTest = await requireTestById(testId);
  const updatedTestType = {
    ...retrievedTest,
    ...test,
  };
  const editResponse = await apiClient.put<Test>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TEST_TYPES}/${testId}`,
    updatedTestType,
  );
  return editResponse.data || null;
};

export const deleteTestService = async (testId: string): Promise<void> => {
  const retrievedTestType = await requireTestById(testId);
  await apiClient.delete(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TEST_TYPES}/${retrievedTestType.id}`,
  );
};

const requireTestById = async (testId: string) => {
  const test = await getTestByIdService(testId);
  if (!test) {
    throw new Error(ELEMENT_NOT_FOUND_MESSAGE);
  }
  return test;
};
