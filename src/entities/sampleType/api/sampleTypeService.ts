import axios from "axios";

import {Sample} from "../../../entities/sample/model/Sample";
import EnvManager from "../../../config/EnvManager";
import {SampleType} from "../model/SampleType";
import {axiosResponseToSampleType} from "../../../adapters/sampleType";

export const getSampleTypesService = async (): Promise<SampleType[]> => {
  try {
    const response = await axios.get<SampleType[]>(
      `${EnvManager.BACKEND_URL}/sampleTypes`,
    );
    return axiosResponseToSampleType(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving sample types: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving sample types.");
    }
  }
};

export const getSampleTypeByIdService = async (
  sampleTypeId: string,
): Promise<SampleType> => {
  try {
    const response = await axios.get<Sample>(
      `${EnvManager.BACKEND_URL}/sampleTypes/${sampleTypeId}`,
    );
    return axiosResponseToSampleType(response)[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving sample type: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving sample type.");
    }
  }
};
