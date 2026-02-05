import {create} from "zustand";
import {SamplesStore} from "./types";
import {Sample} from "../../../model";
import {
  createSampleService,
  deleteSampleService,
  editSampleService,
  getSampleByIdService,
  getSamplesService,
} from "../../../services";
import {
  SAMPLE_ID_MISSING_TEXT,
  SAMPLE_ID_OR_SAMPLE_MISSING_TEXT,
} from "../../../utils/constants";

export const useSampleStore = create<SamplesStore>((set) => ({
  samples: null,
  selectedSample: null,
  isLoading: false,
  error: null,

  setSelectedSample: (sample: Sample | null) => set({selectedSample: sample}),

  getSamples: async () => {
    set({isLoading: true, error: null});
    try {
      const fetchedSamples = await getSamplesService();
      set({samples: fetchedSamples});
    } catch (err) {
      set({error: (err as Error).message});
    } finally {
      set({isLoading: false});
    }
  },

  getSampleById: async (sampleId: string) => {
    set({isLoading: true, error: null});
    try {
      return await getSampleByIdService(sampleId);
    } catch (e) {
      set({error: (e as Error).message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  createSample: async (sample: Sample) => {
    set({isLoading: true, error: null});
    try {
      return await createSampleService(sample);
    } catch (e) {
      set({error: (e as Error).message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  editSample: async (sampleId?: string, sample?: Sample) => {
    set({isLoading: true, error: null});
    try {
      if (!sampleId || !sample) {
        set({error: SAMPLE_ID_OR_SAMPLE_MISSING_TEXT});
        return null;
      }
      return await editSampleService(sampleId, sample);
    } catch (e) {
      set({error: (e as Error).message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  deleteSample: async (sampleId?: string) => {
    try {
      set({isLoading: true, error: null});
      if (!sampleId) {
        set({error: SAMPLE_ID_MISSING_TEXT});
        return null;
      }
      return await deleteSampleService(sampleId);
    } catch (e) {
      set({error: (e as Error).message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
}));
