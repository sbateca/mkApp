import {apiClient} from "../../../shared/api/apliClient";
import {TestType} from "../model/TestType";
import EnvManager from "../../../config/EnvManager";
import {axiosResponseToTestypes} from "../lib/testTypeMappers";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";

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
  return axiosResponseToTestypes(response)[0];
};

export const createTestTypeService = async (testType: TestType) => {
  const response = await apiClient.post<TestType>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TEST_TYPES}`,
    testType,
  );
  return axiosResponseToTestypes(response)[0];
};

export const editTestTypeService = async (
  testType: TestType,
  testTypeId: string,
): Promise<TestType> => {
  const editResponse = await apiClient.put<TestType>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TEST_TYPES}/${testTypeId}`,
    testType,
  );
  return axiosResponseToTestypes(editResponse)[0];
};

export const deleteTestTypeService = async (
  testTypeId: string,
): Promise<TestType> => {
  const response = await apiClient.delete<TestType>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.TEST_TYPES}/${testTypeId}`,
  );
  return axiosResponseToTestypes(response)[0];
};
