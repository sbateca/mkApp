import {create} from "zustand";
import {SampleType} from "../../../model";
import {SampleTypeStore} from "./types";
import {
  getSampleTypeByIdService,
  getSampleTypesService,
} from "../../../services";

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
      return await getSampleTypesService();
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
