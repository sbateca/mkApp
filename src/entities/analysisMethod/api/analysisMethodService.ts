import axios from "axios";
import {AnalysisMethod} from "../../../model";
import EnvManager from "../../../config/EnvManager";
import {axiosResponseToAnalysisMethods} from "../lib/analysisMethodMappers";

export const getAnalysisMethodService = async (): Promise<AnalysisMethod[]> => {
  try {
    const response = await axios.get<AnalysisMethod[]>(
      `${EnvManager.BACKEND_URL}/analysisMethods`,
    );
    return axiosResponseToAnalysisMethods(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error retrieving analysisMethod types: ${error.message}`,
      );
    } else {
      throw new Error(
        "An unknown error occurred retrieving analysisMethod types.",
      );
    }
  }
};

export const getAnalysisMethodByIdService = async (
  id: string,
): Promise<AnalysisMethod> => {
  try {
    const response = await axios.get<AnalysisMethod>(
      `${EnvManager.BACKEND_URL}/analysisMethods/${id}`,
    );
    return axiosResponseToAnalysisMethods(response)[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving analysisMethod type: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving analysis methods.");
    }
  }
};
