import {Sample} from "./Sample";

export type SamplesStore = {
  samples: Sample[] | null;
  selectedSample: Sample | null;
  isLoading: boolean;
  error: string | null;
  setSelectedSample: (sample: Sample | null) => void;
  setSamples: (samples: Sample[] | null) => void;
  getSamples: () => Promise<Sample[] | null>;
  getSampleById: (sampleId: string) => Promise<Sample | null>;
  createSample: (sample: Sample) => Promise<Sample | null>;
  editSample: (sampleId?: string, sample?: Sample) => Promise<Sample | null>;
  deleteSample: (sampleId?: string) => Promise<Sample | null>;
};
