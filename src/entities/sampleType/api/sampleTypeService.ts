import {Sample} from "../../../entities/sample/model/Sample";
import EnvManager from "../../../config/EnvManager";
import {SampleType} from "../model/SampleType";
import {axiosResponseToSampleType} from "../lib/sampleTypeMappers";
import {apiClient} from "../../../shared/api/apliClient";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";

export const getSampleTypesService = async (): Promise<SampleType[]> => {
  const response = await apiClient.get<SampleType[]>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.SAMPLE_TYPES}`,
  );
  return axiosResponseToSampleType(response);
};

export const getSampleTypeByIdService = async (
  sampleTypeId: string,
): Promise<SampleType> => {
  const response = await apiClient.get<Sample>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.SAMPLE_TYPES}/${sampleTypeId}`,
  );
  return axiosResponseToSampleType(response)[0];
};

export const createSampleTypeService = async (
  sampleType: SampleType,
): Promise<SampleType> => {
  const response = await apiClient.post<SampleType>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.SAMPLE_TYPES}`,
    sampleType,
  );
  return axiosResponseToSampleType(response)[0];
};

export const editSampleTypeService = async (
  sampleType: SampleType,
  sampleTypeId: string,
): Promise<SampleType> => {
  const response = await apiClient.put<SampleType>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.SAMPLE_TYPES}/${sampleTypeId}`,
    sampleType,
  );
  return axiosResponseToSampleType(response)[0];
};

export const deleteSampleTypeService = async (
  sampleTypeId: string,
): Promise<SampleType> => {
  const response = await apiClient.delete<SampleType>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.SAMPLE_TYPES}/${sampleTypeId}`,
  );
  return axiosResponseToSampleType(response)[0];
};
