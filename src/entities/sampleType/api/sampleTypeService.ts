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
