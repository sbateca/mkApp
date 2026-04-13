import axios from "axios";
import EnvManager from "../../../config/EnvManager";
import {axiosResponseToAnalyte} from "../lib/analyteMappers";
import {Analyte} from "../model/Analyte";

export const getAnalytesService = async (): Promise<Analyte[]> => {
  try {
    const response = await axios.get<Analyte[]>(
      `${EnvManager.BACKEND_URL}/analytes`,
    );
    return axiosResponseToAnalyte(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving analyte types: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving analyte types.");
    }
  }
};

export const getAnalyteByIdService = async (
  analyteTypeId: string,
): Promise<Analyte> => {
  try {
    const response = await axios.get<Analyte>(
      `${EnvManager.BACKEND_URL}/analytes/${analyteTypeId}`,
    );
    return axiosResponseToAnalyte(response)[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving analyte type: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving analyte type.");
    }
  }
};
