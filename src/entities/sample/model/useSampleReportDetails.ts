import {useMemo} from "react";
import {Sample} from "./Sample";
import {SampleType} from "../../sampleType";
import {Client} from "../../client";

interface SampleCardDetails {
  sampleCode: string;
  sampleType: string;
  client: string;
  getSampleDate: string;
  receptionDate: string;
  analysisDate: string;
  sampleLocation: string;
  responsable: string;
}

export const useSampleReportDetails = (
  sample: Sample | null,
  sampleTypes: SampleType[],
  clients: Client[],
) => {
  const getSampleTypeFromSample = () => {
    if (sample) {
      return sampleTypes.find(
        (sampleType) => sampleType.id === sample.sampleTypeId,
      );
    }
    return null;
  };

  const getClientFromSample = () => {
    if (sample) {
      return clients.find((client) => client.id === sample.clientId);
    }
    return null;
  };

  const getSampleCardDetails = (): SampleCardDetails => {
    return {
      sampleCode: sample ? sample.sampleCode : "",
      sampleType: getSampleTypeFromSample()?.name || "",
      client: getClientFromSample()?.name || "",
      getSampleDate: sample ? sample.getSampleDate : "",
      receptionDate: sample ? sample.receptionDate : "",
      analysisDate: sample ? sample.analysisDate : "",
      sampleLocation: sample ? sample.sampleLocation : "",
      responsable: sample ? sample.responsable : "",
    };
  };

  const sampleCardDetails = useMemo(
    () => getSampleCardDetails(),
    [sample, sampleTypes, clients],
  );
  return {sampleCardDetails};
};
