import axios from "axios";

import {Sample} from "../../../entities/sample/model/Sample";
import EnvManager from "../../../config/EnvManager";
import {axiosResponseToSamples} from "../../../entities/sample/lib/sampleMapper";

export const getSamplesService = async (): Promise<Sample[]> => {
  try {
    const response = await axios.get<Sample[]>(
      `${EnvManager.BACKEND_URL}/samples`,
    );
    return axiosResponseToSamples(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving samples: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving samples.");
    }
  }
};

export const getSampleByIdService = async (
  sampleId: string,
): Promise<Sample> => {
  try {
    const response = await axios.get<Sample>(
      `${EnvManager.BACKEND_URL}/samples/${sampleId}`,
    );
    return axiosResponseToSamples(response)[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving sample: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving sample.");
    }
  }
};

export const createSampleService = async (sample: Sample): Promise<Sample> => {
  try {
    const response = await axios.post(
      `${EnvManager.BACKEND_URL}/samples`,
      sample,
    );
    return axiosResponseToSamples(response)[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating sample: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred creating sample.");
    }
  }
};

export const editSampleService = async (
  sampleId: string,
  sample: Sample,
): Promise<Sample> => {
  try {
    const response = await axios.put(
      `${EnvManager.BACKEND_URL}/samples/${sampleId}`,
      sample,
    );
    return axiosResponseToSamples(response)[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error editing sample: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred editing sample.");
    }
  }
};

export const deleteSampleService = async (
  sampleId: string,
): Promise<Sample> => {
  try {
    const response = await axios.delete(
      `${EnvManager.BACKEND_URL}/samples/${sampleId}`,
    );
    return axiosResponseToSamples(response)[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting sample: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred deleting sample.");
    }
  }
};
