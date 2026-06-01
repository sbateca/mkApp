import EnvManager from "../../../config/EnvManager";
import {axiosResponseToAnalysisMethods} from "../lib/analysisMethodMappers";
import {AnalysisMethod} from "../model/AnalysisMethod";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";
import {apiClient} from "../../../shared/api/apliClient";

export const getAnalysisMethodService = async (): Promise<AnalysisMethod[]> => {
  const response = await apiClient.get<AnalysisMethod[]>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.ANALYSIS_METHODS}`,
  );
  return axiosResponseToAnalysisMethods(response);
};

export const getAnalysisMethodByIdService = async (
  id: string,
): Promise<AnalysisMethod> => {
  const response = await apiClient.get<AnalysisMethod>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.ANALYSIS_METHODS}/${id}`,
  );
  return axiosResponseToAnalysisMethods(response)[0];
};

export const createAnalysisMethodService = async (
  analysisMethod: AnalysisMethod,
): Promise<AnalysisMethod> => {
  const response = await apiClient.post<AnalysisMethod>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.ANALYSIS_METHODS}`,
    analysisMethod,
  );
  return axiosResponseToAnalysisMethods(response)[0];
};

export const editAnalysisMethodService = async (
  analysisMethod: AnalysisMethod,
  analysisMethodId: string,
): Promise<AnalysisMethod> => {
  const response = await apiClient.put<AnalysisMethod>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.ANALYSIS_METHODS}/${analysisMethodId}`,
    analysisMethod,
  );
  return axiosResponseToAnalysisMethods(response)[0];
};

export const deleteAnalysisMethodService = async (
  analysisMethodId: string,
): Promise<AnalysisMethod> => {
  const response = await apiClient.delete<AnalysisMethod>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.ANALYSIS_METHODS}/${analysisMethodId}`,
  );
  return axiosResponseToAnalysisMethods(response)[0];
};
