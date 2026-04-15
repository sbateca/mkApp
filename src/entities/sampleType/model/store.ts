import {create} from "zustand";
import {SampleTypeStore} from "./types";
import {SampleType} from "./SampleType";
import {
  getSampleTypeByIdService,
  getSampleTypesService,
} from "../api/sampleTypeService";

export const useSampleTypeStore = create<SampleTypeStore>((set) => ({
  sampleTypes: null,
  selectedSampleType: null,
  isLoading: false,
  error: null,

  setSelectedSampleType: (sampleType: SampleType | null) =>
    set({selectedSampleType: sampleType}),

  setSampleTypes: (sampleTypes: SampleType[] | null) =>
    set({sampleTypes: sampleTypes ? [...sampleTypes] : null}),

  getSampleTypes: async () => {
    set({isLoading: true, error: null});
    try {
      const sampleTypes = await getSampleTypesService();
      set({sampleTypes: sampleTypes ? [...sampleTypes] : null});
      return sampleTypes;
    } catch (error) {
      set({error: (error as Error).message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  getSampleTypeById: async (sampleId: string) => {
    set({isLoading: true, error: null});
    try {
      return getSampleTypeByIdService(sampleId);
    } catch (error) {
      set({error: (error as Error).message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
}));
