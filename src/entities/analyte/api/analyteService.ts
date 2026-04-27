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
  analyteTypeId: string,
): Promise<Analyte> => {
  const response = await apiClient.get<Analyte[]>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.ANALYTES}/${analyteTypeId}`,
  );
  return axiosResponseToAnalyte(response)[0];
};
