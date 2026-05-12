import {AxiosResponse} from "axios";
import {v4 as uuidv4} from "uuid";

import {Report} from "../model/Report";
import {
  N_A,
  RESPONSE_DATA_NOT_VALID_ERROR,
  getInvalidDataErrorMessage,
} from "../../../utils/constants";
import {Sample} from "../../sample";
import {SampleType} from "../../sampleType";
import {filterModelsById} from "../../../utils/model";
import {TableRowProps} from "../../../shared/ui/Table/TableRow";
import {Analyte} from "../../analyte/model/Analyte";
import {Client} from "../../client";
import {TestType} from "../../testType";
import {AnalysisMethod} from "../../analysisMethod/model/AnalysisMethod";
import {Criteria} from "../../criteria";
import {Test} from "../../test";
import {SharedTypographyAlign} from "../../../utils/enums";

export type ReportDetailDataProps = {
  clients: Client[] | null;
  analysisMethods: AnalysisMethod[] | null;
  analytes: Analyte[] | null;
  criterias: Criteria[] | null;
  sampleTypes: SampleType[] | null;
  samples: Sample[] | null;
  tests: Test[] | null;
  testTypes: TestType[] | null;
};

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
      typeof reportObj.reportNumber === "string" &&
      typeof reportObj.reportDate === "string" &&
      typeof reportObj.sample === "object" &&
      typeof reportObj.tests === "object"
    );
  }
  return false;
};

export const reportFormToReport = (
  form: Record<string, string>,
  reportId: string,
  reportDetailData: ReportDetailDataProps,
): Report => {
  const sample = filterModelsById(
    reportDetailData.samples || [],
    form.sampleId,
  );
  return {
    id: reportId || uuidv4(),
    reportNumber: form.reportNumber || "",
    reportDate: form.reportDate as string,
    sample: sample,
    tests: buildTestsFromData(form, reportDetailData),
  };
};

const buildTestsFromData = (
  form: Record<string, unknown>,
  reportDetailData: ReportDetailDataProps,
) => {
  const testType = filterModelsById(
    reportDetailData.testTypes || [],
    form.testType as string,
  );
  const analyte = filterModelsById(
    reportDetailData.analytes || [],
    form.analyte as string,
  );
  const analysisMethod = filterModelsById(
    reportDetailData.analysisMethods || [],
    form.analysisMethod as string,
  );
  const criteria = filterModelsById(
    reportDetailData.criterias || [],
    form.criteria as string,
  );

  const testIds = form.testIds as string[];

  const tests: Test[] = testIds.map((testId) => {
    return {
      id: testId || uuidv4(),
      testType: testType,
      sampleId: form.sampleId as string,
      analyte: analyte,
      analysisMethod: analysisMethod,
      criteria: criteria,
      result: form.result as string,
    };
  });
  return tests;
};

export const reportToReportForm = (report: Report): Record<string, unknown> => {
  return {
    reportNumber: report.reportNumber,
    reportDate: report.reportDate,
    sampleId: report.sample.id,
    tests: report.tests.map((test) => ({
      testTypeId: test.testType.id,
      sampleId: test.sampleId,
      analyteId: test.analyte.id,
      analysisMethodId: test.analysisMethod.id,
      criteriaId: test.criteria.id,
      result: test.result,
    })),
  };
};

export const reportsToTableRows = (reports: Report[]): TableRowProps[] => {
  return reports.map((report) => {
    return {
      id: report.id,
      cells: [
        {
          children: report.reportNumber || N_A,
          align: SharedTypographyAlign.LEFT,
        },
        {children: report.reportDate || N_A, align: SharedTypographyAlign.LEFT},
        {
          children: report.sample.client.name || N_A,
          align: SharedTypographyAlign.LEFT,
        },
        {
          children: report.sample.getSampleDate || N_A,
          align: SharedTypographyAlign.LEFT,
        },
        {
          children: report.sample.receptionDate || N_A,
          align: SharedTypographyAlign.LEFT,
        },
        {
          children: report.sample.responsable || N_A,
          align: SharedTypographyAlign.LEFT,
        },
        {
          children: report.sample.analysisDate || N_A,
          align: SharedTypographyAlign.LEFT,
        },
        {
          children:
            `${report.sample.sampleType.name} - ${report.sample.sampleLocation}` ||
            N_A,
          align: SharedTypographyAlign.LEFT,
        },
      ],
    };
  });
};
