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
