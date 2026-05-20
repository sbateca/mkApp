/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from "axios";
import {v4 as uuidv4} from "uuid";

import {Sample} from "../model/Sample";
import {
  RESPONSE_DATA_NOT_VALID_ERROR,
  getInvalidDataErrorMessage,
} from "../../../utils/constants";
import {SampleType} from "../../sampleType";
import {Client} from "../../client";
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

export const isValidSample = (sample: unknown): sample is Sample => {
  if (typeof sample !== "object" || sample === null) return false;

  const s = sample as Record<string, unknown>;

  return (
    typeof s.id === "string" &&
    typeof s.sampleCode === "string" &&
    isValidSampleType(s.sampleType) &&
    isValidClient(s.client) &&
    typeof s.getSampleDate === "string" &&
    typeof s.receptionDate === "string" &&
    typeof s.analysisDate === "string" &&
    typeof s.sampleLocation === "string" &&
    typeof s.responsable === "string"
  );
};

const isValidClient = (client: unknown): client is Client => {
  return (
    typeof client === "object" &&
    client !== null &&
    typeof (client as any).id === "string" &&
    typeof (client as any).name === "string"
  );
};

const isValidSampleType = (sampleType: unknown): sampleType is SampleType => {
  return (
    typeof sampleType === "object" &&
    sampleType !== null &&
    typeof (sampleType as any).id === "string" &&
    typeof (sampleType as any).name === "string"
  );
};

export const sampleFormToSample = (
  form: Record<string, unknown>,
  sampleId: string,
  clients: Client[] | null,
  samplesTypes: SampleType[] | null,
): Sample => {
  const client = clients?.find((client) => client.id === form.client);
  const sampleType = samplesTypes?.find(
    (sampleType) => sampleType.id === form.sampleType,
  );

  if (!client || !sampleType) {
    throw new Error("Invalid sample form references");
  }

  return {
    id: sampleId || uuidv4(),
    sampleCode: form.sampleCode as string,
    sampleType: sampleType,
    client: client,
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
    sampleType: sample.sampleType.id,
    client: sample.client.id,
    getSampleDate: sample.getSampleDate,
    receptionDate: sample.receptionDate,
    analysisDate: sample.analysisDate,
    sampleLocation: sample.sampleLocation,
    responsable: sample.responsable,
  };
};

export const samplesToTableRows = (samples: Sample[]): TableRowProps[] => {
  return samples.map((sample) => {
    // const sampleType = findModelById(sample.sampleType.id, sampleTypes);
    // const client = findModelById(sample.client.id, clients);
    return {
      id: sample.id,
      cells: [
        {children: sample.sampleType.name, align: "left"},
        {children: sample.client.name, align: "left"},
        {children: sample.getSampleDate, align: "left"},
        {children: sample.receptionDate, align: "left"},
      ],
    };
  });
};
