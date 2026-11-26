import EnvManager from "../../../config/EnvManager";
import {axiosResponseToCriteria} from "../lib/criteriaMappers";
import {Criteria} from "../model/Criteria";
import {apiClient} from "../../../shared/api/apliClient";
import {ApiRoutes} from "../../../utils/constants/baseRoutes";

export const getCriteriasService = async (): Promise<Criteria[]> => {
  const response = await apiClient.get<Criteria[]>(
    `${EnvManager.BACKEND_URL}${ApiRoutes.CRITERIAS}`,
  );
  return axiosResponseToCriteria(response);
};

export const getCriteriaByIdService = async (id: string): Promise<Criteria> => {
  const response = await apiClient.get<Criteria>(
    `${EnvManager.BACKEND_URL}${ApiRoutes.CRITERIAS}/${id}`,
  );
  return axiosResponseToCriteria(response)[0];
};

export const createCriteriaService = async (
  criteria: Criteria,
): Promise<Criteria> => {
  const response = await apiClient.post<Criteria>(
    `${EnvManager.BACKEND_URL}${ApiRoutes.CRITERIAS}`,
    criteria,
  );
  return axiosResponseToCriteria(response)[0];
};

export const editCriteriaService = async (
  criteria: Criteria,
  criteriaId: string,
): Promise<Criteria> => {
  const response = await apiClient.put<Criteria>(
    `${EnvManager.BACKEND_URL}${ApiRoutes.CRITERIAS}/${criteriaId}`,
    criteria,
  );
  return axiosResponseToCriteria(response)[0];
};

export const deleteCriteriaService = async (
  criteriaId: string,
): Promise<Criteria> => {
  const response = await apiClient.delete<Criteria>(
    `${EnvManager.BACKEND_URL}${ApiRoutes.CRITERIAS}/${criteriaId}`,
  );
  return axiosResponseToCriteria(response)[0];
};
