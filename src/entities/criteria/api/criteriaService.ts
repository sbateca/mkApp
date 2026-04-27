import EnvManager from "../../../config/EnvManager";
import {axiosResponseToCriteria} from "../lib/criteriaMappers";
import {Criteria} from "../model/Criteria";
import {apiClient} from "../../../shared/api/apliClient";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";

export const getCriteriasService = async (): Promise<Criteria[]> => {
  const response = await apiClient.get<Criteria[]>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.CRITERIAS}`,
  );
  return axiosResponseToCriteria(response);
};

export const getCriteriaByIdService = async (id: string): Promise<Criteria> => {
  const response = await apiClient.get<Criteria>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.CRITERIAS}/${id}`,
  );
  return axiosResponseToCriteria(response)[0];
};
