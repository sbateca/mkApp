import {findModelById} from "../utils/model";
import {TableRowProps} from "../components/molecules/TableRow/Types";
import {Sample} from "../entities/sample";
import {SampleType} from "../entities/sampleType";
import {Analyte} from "../model";
import {Report} from "../entities/report";

export const reportsToTableRows = (
  reports: Report[],
  samples: Sample[] | null,
  sampleTypes: SampleType[] | null,
  analytes: Analyte[] | null,
): TableRowProps[] => {
  return reports.map((report) => {
    const sampleTypeCellContent = getSampleTypeCellContent(
      report.sampleId,
      samples,
      sampleTypes,
    );
    const analyteCellContent =
      analytes?.find((analyte) => analyte.id === report.analyte)?.name ?? "N/A";
    return {
      id: report.id,
      cells: [
        {children: report.reportDate, align: "left"},
        {
          children: sampleTypeCellContent,
          align: "left",
        },
        {children: analyteCellContent, align: "left"},
        {children: report.result, align: "left"},
      ],
    };
  });
};

const getSampleTypeCellContent = (
  sampleId: string,
  samples: Sample[] | null,
  sampleTypes: SampleType[] | null,
): string => {
  const filteredSample = samples?.filter((sample) => sample.id === sampleId)[0];
  const sampleTypeName = findModelById(
    filteredSample?.sampleTypeId,
    sampleTypes || [],
  );
  return filteredSample
    ? `${filteredSample.sampleCode} - ${sampleTypeName?.name}`
    : "N/A";
};
