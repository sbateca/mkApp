import {SampleType} from "../../../model";

export type SampleTypeStore = {
  sampleTypes: SampleType[] | null;
  selectedSampleType: SampleType | null;
  isLoading: boolean;
  error: string | null;
  setSampleTypes: (sampleTypes: SampleType[] | null) => void;
  setSelectedSampleType: (sampleType: SampleType | null) => void;
  getSampleTypes: () => Promise<SampleType[] | null>;
  getSampleTypeById: (sampleId: string) => Promise<SampleType | null>;
};
