import {AxiosResponse} from "axios";
import {v4 as uuidv4} from "uuid";

import {Report} from "../model/Report";
import {
  RESPONSE_DATA_NOT_VALID_ERROR,
  getInvalidDataErrorMessage,
} from "../../../utils/constants";

export const axiosResponseToReports = (
  response: AxiosResponse<unknown>,
): Report[] => {
  if (Array.isArray(response.data)) {
    return response.data
      .map((report: unknown) => {
        if (isValidReport(report)) {
          return report as Report;
        } else {
          throw new Error(getInvalidDataErrorMessage("report"));
        }
      })
      .filter((report): report is Report => report !== null);
  } else {
    throw new Error(RESPONSE_DATA_NOT_VALID_ERROR);
  }
};

const isValidReport = (report: unknown): report is Report => {
  if (typeof report === "object" && report !== null) {
    const reportObj = report as Record<string, unknown>;
    return (
      typeof reportObj.id === "string" &&
      typeof reportObj.reportDate === "string" &&
      typeof reportObj.sampleId === "string" &&
      typeof reportObj.analyte === "string" &&
      typeof reportObj.analysisMethod === "string" &&
      typeof reportObj.criteria === "string" &&
      typeof reportObj.result === "string"
    );
  }
  return false;
};

export const reportFormToReport = (
  form: Record<string, unknown>,
  reportId: string,
): Report => {
  return {
    id: reportId || uuidv4(),
    reportDate: form.reportDate as string,
    sampleId: form.sampleId as string,
    analyte: form.analyte as string,
    analysisMethod: form.analysisMethod as string,
    criteria: form.criteria as string,
    result: form.result as string,
  };
};

export const reportToReportForm = (report: Report): Record<string, string> => {
  return {
    reportDate: report.reportDate,
    sampleId: report.sampleId,
    analyte: report.analyte,
    analysisMethod: report.analysisMethod,
    criteria: report.criteria,
    result: report.result,
  };
};
