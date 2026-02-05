import {Sample} from "../../../model";

export type SamplesStore = {
  samples: Sample[] | null;
  selectedSample: Sample | null;
  isLoading: boolean;
  error: string | null;
  setSelectedSample: (sample: Sample | null) => void;
  getSamples: () => Promise<void>;
  getSampleById: (sampleId: string) => Promise<Sample | null>;
  createSample: (sample: Sample) => Promise<Sample | null>;
  editSample: (sampleId?: string, sample?: Sample) => Promise<Sample | null>;
  deleteSample: (sampleId?: string) => Promise<Sample | null>;
};
