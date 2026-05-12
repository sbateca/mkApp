import {useMemo} from "react";
import {Sample} from "./Sample";
import {SampleType} from "../../sampleType";
import {Client} from "../../client";
import {REPORT_FORM_FIELDS, REPORT_FORM_LABELS} from "../../../utils/constants";

interface SampleCardDetailItem {
  label: string;
  value: string;
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

export const useSampleReportDetails = (
  sample: Sample | null,
  sampleTypes: SampleType[],
  clients: Client[],
) => {
  const getSampleTypeFromSample = () => {
    if (sample) {
      return sampleTypes.find(
        (sampleType) => sampleType.id === sample.sampleType.id,
      );
    }
    return null;
  };

  const getClientFromSample = () => {
    if (sample) {
      return clients.find((client) => client.id === sample.client.id);
    }
    return null;
  };

  const getSampleCardDetails = (): SampleCardDetails => {
    return {
      [REPORT_FORM_FIELDS.SAMPLE_CODE]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.SAMPLE_CODE],
        value: sample ? sample.sampleCode : "",
      },
      [REPORT_FORM_FIELDS.SAMPLE_TYPE]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.SAMPLE_TYPE],
        value: getSampleTypeFromSample()?.name || "",
      },
      [REPORT_FORM_FIELDS.CLIENT]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.CLIENT],
        value: getClientFromSample()?.name || "",
      },
      [REPORT_FORM_FIELDS.GET_SAMPLE_DATE]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.GET_SAMPLE_DATE],
        value: sample ? sample.getSampleDate : "",
      },
      [REPORT_FORM_FIELDS.RECEPTION_DATE]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.RECEPTION_DATE],
        value: sample ? sample.receptionDate : "",
      },
      [REPORT_FORM_FIELDS.ANALYSIS_DATE]: {
        label: REPORT_FORM_LABELS[REPORT_FORM_FIELDS.ANALYSIS_DATE],
        value: sample ? sample.analysisDate : "",
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
    [sample, sampleTypes, clients],
  );
  return {sampleCardDetails};
};
