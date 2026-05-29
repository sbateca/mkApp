import {SampleType} from "./SampleType";

export type SampleTypeStore = {
  sampleTypes: SampleType[] | null;
  selectedSampleType: SampleType | null;
  isLoading: boolean;
  error: string | null;
  setSampleTypes: (sampleTypes: SampleType[] | null) => void;
  setSelectedSampleType: (sampleType: SampleType | null) => void;
  getSampleTypes: () => Promise<SampleType[] | null>;
  getSampleTypeById: (sampleId: string) => Promise<SampleType | null>;
  createSampleType: (sampleType: SampleType) => Promise<SampleType | null>;
  deleteSampleType: (sampleTypeId: string) => Promise<SampleType | null>;
  editSampleType: (
    sampleType: SampleType,
    sampleTypeId: string,
  ) => Promise<SampleType | null>;
};
