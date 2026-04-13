import axios from "axios";

import EnvManager from "../../../config/EnvManager";
import {axiosResponseToReports} from "../lib/reportMappers";
import {Report} from "../model/Report";

export const getReportsService = async (): Promise<Report[]> => {
  try {
    const response = await axios.get<Report[]>(
      `${EnvManager.BACKEND_URL}/reports`,
    );
    return axiosResponseToReports(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving reports: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving reports.");
    }
  }
};

export const getReportByIdService = async (
  reportId: string,
): Promise<Report | null> => {
  try {
    const response = await axios.get<Report>(
      `${EnvManager.BACKEND_URL}/reports/${reportId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving report: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving report.");
    }
  }
};

export const createReportService = async (
  report: Report,
): Promise<Report | null> => {
  try {
    const response = await axios.post<Report>(
      `${EnvManager.BACKEND_URL}/reports`,
      report,
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating report: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred creating report.");
    }
  }
};

export const editReportService = async (
  reportId: string,
  report: Report,
): Promise<Report | null> => {
  try {
    const response = await axios.put<Report>(
      `${EnvManager.BACKEND_URL}/reports/${reportId}`,
      report,
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error editing report: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred editing report.");
    }
  }
};

export const deleteReportService = async (
  reportId: string,
): Promise<Report | null> => {
  try {
    const response = await axios.delete<Report>(
      `${EnvManager.BACKEND_URL}/reports/${reportId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting report: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred deleting report.");
    }
  }
};
