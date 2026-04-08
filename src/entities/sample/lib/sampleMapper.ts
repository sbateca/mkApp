import {AxiosResponse} from "axios";
import {v4 as uuidv4} from "uuid";

import {Sample} from "../model/Sample";
import {
  RESPONSE_DATA_NOT_VALID_ERROR,
  getInvalidDataErrorMessage,
} from "../../../utils/constants";
import {SampleType} from "../../sampleType";
import {Client} from "../../client";
import {findModelById} from "../../../utils/model";
import {TableRowProps} from "../../../shared/ui/Table/TableRow";

export const axiosResponseToSamples = (
  response: AxiosResponse<unknown>,
): Sample[] => {
  return getSamplesFromData(response.data);
};

const getSamplesFromData = (data: unknown): Sample[] => {
  if (data instanceof Array) {
    return data
      .map((sample: unknown) => {
        if (isValidSample(sample)) {
          return sample as Sample;
        } else {
          throw new Error(getInvalidDataErrorMessage("sample"));
        }
      })
      .filter((sample): sample is Sample => sample !== null);
  } else if (data instanceof Object) {
    return [data as Sample];
  } else {
    throw new Error(RESPONSE_DATA_NOT_VALID_ERROR);
  }
};

const isValidSample = (sample: unknown): sample is Sample => {
  if (typeof sample === "object" && sample !== null) {
    const sampleObj = sample as Record<string, unknown>;
    return (
      typeof sampleObj.id === "string" &&
      typeof sampleObj.sampleCode === "string" &&
      typeof sampleObj.clientId === "string" &&
      typeof sampleObj.getSampleDate === "string" &&
      typeof sampleObj.receptionDate === "string" &&
      typeof sampleObj.analysisDate === "string" &&
      typeof sampleObj.sampleLocation === "string" &&
      typeof sampleObj.responsable === "string"
    );
  }
  return false;
};

export const sampleFormToSample = (
  form: Record<string, unknown>,
  sampleId: string,
): Sample => {
  return {
    id: sampleId || uuidv4(),
    sampleCode: form.sampleCode as string,
    sampleTypeId: form.sampleType as string,
    clientId: form.client as string,
    getSampleDate: form.getSampleDate as string,
    receptionDate: form.receptionDate as string,
    analysisDate: form.analysisDate as string,
    sampleLocation: form.sampleLocation as string,
    responsable: form.responsable as string,
  };
};

export const sampleToSampleForm = (sample: Sample): Record<string, string> => {
  return {
    sampleCode: sample.sampleCode,
    sampleType: sample.sampleTypeId,
    client: sample.clientId,
    getSampleDate: sample.getSampleDate,
    receptionDate: sample.receptionDate,
    analysisDate: sample.analysisDate,
    sampleLocation: sample.sampleLocation,
    responsable: sample.responsable,
  };
};

export const samplesToTableRows = (
  samples: Sample[],
  sampleTypes: SampleType[] | null,
  clients: Client[] | null,
): TableRowProps[] => {
  return samples.map((sample) => {
    const sampleType = findModelById(sample.sampleTypeId, sampleTypes);
    const client = findModelById(sample.clientId, clients);
    return {
      id: sample.id,
      cells: [
        {children: sampleType ? sampleType.name : "N/A", align: "left"},
        {children: client ? client.name : "N/A", align: "left"},
        {children: sample.getSampleDate, align: "left"},
        {children: sample.receptionDate, align: "left"},
      ],
    };
  });
};
