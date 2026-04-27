import EnvManager from "../../../config/EnvManager";
import {axiosResponseToReports} from "../lib/reportMappers";
import {Report} from "../model/Report";
import {apiClient} from "../../../shared/api/apliClient";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";

export const getReportsService = async (): Promise<Report[]> => {
  const response = await apiClient.get<Report[]>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.REPORTS}`,
  );
  return axiosResponseToReports(response);
};

export const getReportByIdService = async (
  reportId: string,
): Promise<Report | null> => {
  const response = await apiClient.get<Report>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.REPORTS}/${reportId}`,
  );
  return response.data;
};

export const createReportService = async (
  report: Report,
): Promise<Report | null> => {
  const response = await apiClient.post<Report>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.REPORTS}`,
    report,
  );
  return response.data;
};

export const editReportService = async (
  reportId: string,
  report: Report,
): Promise<Report | null> => {
  const response = await apiClient.put<Report>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.REPORTS}/${reportId}`,
    report,
  );
  return response.data;
};

export const deleteReportService = async (
  reportId: string,
): Promise<Report | null> => {
  const response = await apiClient.delete<Report>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.REPORTS}/${reportId}`,
  );
  return response.data;
};
