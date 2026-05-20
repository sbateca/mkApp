import {apiClient} from "../../../shared/api/apliClient";
import {TestType} from "../model/TestType";
import EnvManager from "../../../config/EnvManager";
import {axiosResponseToTestypes} from "../lib/testTypeMappers";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";
import {ELEMENT_NOT_FOUND_MESSAGE} from "../../../utils/constants";

export const getTestTypesService = async (): Promise<TestType[]> => {
  const response = await apiClient.get<TestType[]>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TEST_TYPES}`,
  );
  const testTypes = axiosResponseToTestypes(response);
  return testTypes;
};

export const getTestTypeByIdService = async (testTypeId: string) => {
  const response = await apiClient.get<TestType>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TEST_TYPES}/${testTypeId}`,
  );
  const testType = response.data as TestType;
  return testType;
};

export const createTestTypeService = async (testType: TestType) => {
  const response = await apiClient.post<TestType>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TEST_TYPES}`,
    testType,
  );
  return response.data || null;
};

export const editTestTypeService = async (
  testTypeId: string,
  testType: TestType,
): Promise<TestType | null> => {
  const retrievedTestType = await requireTestTypeById(testTypeId);
  const updatedTestType = {
    ...retrievedTestType,
    ...testType,
  };
  const editResponse = await apiClient.put<TestType>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TEST_TYPES}/${testTypeId}`,
    updatedTestType,
  );
  return editResponse.data || null;
};

export const deleteTestTypeService = async (
  testTypeId: string,
): Promise<void> => {
  const retrievedTestType = await requireTestTypeById(testTypeId);
  await apiClient.delete(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TEST_TYPES}/${retrievedTestType.id}`,
  );
};

const requireTestTypeById = async (testTypeId: string) => {
  const testType = await getTestTypeByIdService(testTypeId);
  if (!testType) {
    throw new Error(ELEMENT_NOT_FOUND_MESSAGE);
  }
  return testType;
};
