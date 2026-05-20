import {Client} from "../../client";
import {SampleType} from "../../sampleType";

export interface Sample {
  id: string;
  sampleCode: string;
  sampleType: SampleType;
  client: Client;
  getSampleDate: string;
  receptionDate: string;
  analysisDate: string;
  sampleLocation: string;
  responsable: string;
}
