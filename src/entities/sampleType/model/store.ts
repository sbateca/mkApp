import {create} from "zustand";
import {SampleTypeStore} from "./types";
import {SampleType} from "./SampleType";
import {
  createSampleTypeService,
  deleteSampleTypeService,
  editSampleTypeService,
  getSampleTypeByIdService,
  getSampleTypesService,
} from "../api/sampleTypeService";
import {
  SAMPLE_TYPE_NOT_PROVIDED,
  UNEXPECTED_ERROR,
} from "../../../utils/constants";

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
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
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
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  createSampleType: async (sampleType: SampleType) => {
    set({isLoading: true, error: null});
    try {
      if (!sampleType) throw Error(SAMPLE_TYPE_NOT_PROVIDED);
      return createSampleTypeService(sampleType);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  editSampleType: async (sampleType: SampleType, sampleTypeId: string) => {
    set({isLoading: true, error: null});
    try {
      if (!sampleTypeId || !sampleType) throw Error(SAMPLE_TYPE_NOT_PROVIDED);
      return editSampleTypeService(sampleType, sampleTypeId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  deleteSampleType: async (sampleTypeId: string) => {
    set({isLoading: true, error: null});
    try {
      if (!sampleTypeId) throw Error(SAMPLE_TYPE_NOT_PROVIDED);
      return deleteSampleTypeService(sampleTypeId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
}));
