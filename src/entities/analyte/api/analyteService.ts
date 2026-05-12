import EnvManager from "../../../config/EnvManager";
import {axiosResponseToAnalyte} from "../lib/analyteMappers";
import {Analyte} from "../model/Analyte";
import {apiClient} from "../../../shared/api/apliClient";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";

export const getAnalytesService = async (): Promise<Analyte[]> => {
  const response = await apiClient.get<Analyte[]>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.ANALYTES}`,
  );
  return axiosResponseToAnalyte(response);
};

export const getAnalyteByIdService = async (
  analyteId: string,
): Promise<Analyte> => {
  const response = await apiClient.get<Analyte[]>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.ANALYTES}/${analyteId}`,
  );
  return axiosResponseToAnalyte(response)[0];
};

export const getAnalytesByTestTypeIdService = async (
  testTypeId: string,
): Promise<Analyte[]> => {
  const response = await apiClient.get<Analyte[]>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.ANALYTES}?testType.id=${testTypeId}`,
  );
  return axiosResponseToAnalyte(response);
};
