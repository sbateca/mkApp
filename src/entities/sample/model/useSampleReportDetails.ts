import {useMemo} from "react";
import {Sample} from "./Sample";
import {REPORT_FORM_FIELDS, REPORT_FORM_LABELS} from "../../../utils/constants";

interface SampleCardDetailItem {
  label: string;
  value: string;
  isDate?: boolean;
}
interface SampleCardDetails {
  [REPORT_FORM_FIELDS.SAMPLE_CODE]: SampleCardDetailItem;
  [REPORT_FORM_FIELDS.SAMPLE_TYPE]: SampleCardDetailItem;
  [REPORT_FORM_FIELDS.CLIENT]: SampleCardDetailItem;
  [REPORT_FORM_FIELDS.GET_SAMPLE_DATE]: SampleCardDetailItem;
  [REPORT_FORM_FIELDS.RECEPTION_DATE]: SampleCardDetailItem;
  [REPORT_FORM_FIELDS.ANALYSIS_DATE]: SampleCardDetailItem;
  [REPORT_FORM_FIELDS.SAMPLE_LOCATION]: SampleCardDetailItem;
  [REPORT_FORM_FIELDS.RESPONSABLE]: SampleCardDetailItem;
}

export const useSampleReportDetails = (sample: Sample | null) => {
  const getSampleCardDetails = (): SampleCardDetails => {
    return {
      [REPORT_FORM_FIELDS.SAMPLE_CODE]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.SAMPLE_CODE],
        value: sample ? sample.sampleCode : "",
      },
      [REPORT_FORM_FIELDS.SAMPLE_TYPE]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.SAMPLE_TYPE],
        value: sample?.sampleType?.name ?? "",
      },
      [REPORT_FORM_FIELDS.CLIENT]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.CLIENT],
        value: sample?.client?.name ?? "",
      },
      [REPORT_FORM_FIELDS.GET_SAMPLE_DATE]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.GET_SAMPLE_DATE],
        value: sample ? sample.getSampleDate : "",
        isDate: true,
      },
      [REPORT_FORM_FIELDS.RECEPTION_DATE]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.RECEPTION_DATE],
        value: sample ? sample.receptionDate : "",
        isDate: true,
      },
      [REPORT_FORM_FIELDS.ANALYSIS_DATE]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.ANALYSIS_DATE],
        value: sample ? sample.analysisDate : "",
        isDate: true,
      },
      [REPORT_FORM_FIELDS.SAMPLE_LOCATION]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.SAMPLE_LOCATION],
        value: sample ? sample.sampleLocation : "",
      },
      [REPORT_FORM_FIELDS.RESPONSABLE]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.RESPONSABLE],
        value: sample ? sample.responsable : "",
      },
    };
  };

  const sampleCardDetails = useMemo(
    () => getSampleCardDetails(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sample],
  );
  return {sampleCardDetails};
};
