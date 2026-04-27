import {Sample} from "../../../entities/sample/model/Sample";
import EnvManager from "../../../config/EnvManager";
import {axiosResponseToSamples} from "../../../entities/sample/lib/sampleMapper";
import {apiClient} from "../../../shared/api/apliClient";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";

export const getSamplesService = async (): Promise<Sample[]> => {
  const response = await apiClient.get<Sample[]>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.SAMPLES}`,
  );
  return axiosResponseToSamples(response);
};

export const getSampleByIdService = async (
  sampleId: string,
): Promise<Sample> => {
  const response = await apiClient.get<Sample>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.SAMPLES}/${sampleId}`,
  );
  return axiosResponseToSamples(response)[0];
};

export const createSampleService = async (sample: Sample): Promise<Sample> => {
  const response = await apiClient.post(
    `${EnvManager.BACKEND_URL}${BaseRoutes.SAMPLES}`,
    sample,
  );
  return axiosResponseToSamples(response)[0];
};

export const editSampleService = async (
  sampleId: string,
  sample: Sample,
): Promise<Sample> => {
  const response = await apiClient.put(
    `${EnvManager.BACKEND_URL}${BaseRoutes.SAMPLES}/${sampleId}`,
    sample,
  );
  return axiosResponseToSamples(response)[0];
};

export const deleteSampleService = async (
  sampleId: string,
): Promise<Sample> => {
  const response = await apiClient.delete(
    `${EnvManager.BACKEND_URL}${BaseRoutes.SAMPLES}/${sampleId}`,
  );
  return axiosResponseToSamples(response)[0];
};
