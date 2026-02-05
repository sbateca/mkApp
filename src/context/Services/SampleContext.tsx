import React, {createContext, useState, useEffect, useMemo} from "react";

import {
  createSampleService,
  deleteSampleService,
  editSampleService,
  getSampleByIdService,
  getSamplesService,
} from "../../services/sampleService";
import {Sample} from "../../model/Sample";
import {
  SAMPLE_ID_MISSING_TEXT,
  SAMPLE_ID_OR_SAMPLE_MISSING_TEXT,
} from "../../utils/constants";

export type SampleContextType = {
  samples: Sample[] | null;
  selectedSample: Sample | null;
  setSelectedSample: React.Dispatch<React.SetStateAction<Sample | null>>;
  getSamples: () => Promise<void>;
  getSampleById: (sampleId: string) => Promise<Sample | null>;
  createSample: (sample: Sample) => Promise<Sample | null>;
  editSample: (sampleId?: string, sample?: Sample) => Promise<Sample | null>;
  deleteSample: (sampleId?: string) => Promise<Sample | null>;
  isLoading: boolean;
  error: string | null;
};

const SampleContext = createContext<SampleContextType | null>(null);

interface IProviderProps {
  children: React.ReactNode;
}

function SampleProvider({children}: IProviderProps) {
  const [samples, setSamples] = useState<Sample[] | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getSamples = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const samples = await getSamplesService();
      setSamples(samples);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSampleById = async (sampleId: string): Promise<Sample | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await getSampleByIdService(sampleId);
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createSample = async (sample: Sample): Promise<Sample | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await createSampleService(sample);
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const editSample = async (
    sampleId?: string,
    sample?: Sample,
  ): Promise<Sample | null> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!sampleId || !sample) {
        setError(SAMPLE_ID_OR_SAMPLE_MISSING_TEXT);
        return null;
      }
      return await editSampleService(sampleId, sample);
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSample = async (sampleId?: string): Promise<Sample | null> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!sampleId) {
        setError(SAMPLE_ID_MISSING_TEXT);
        return null;
      }
      return await deleteSampleService(sampleId);
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSamples();
  }, []);

  const value = useMemo(
    () => ({
      samples,
      selectedSample,
      setSelectedSample,
      getSamples,
      getSampleById,
      createSample,
      editSample,
      deleteSample,
      isLoading,
      error,
    }),
    [samples, selectedSample, isLoading, error],
  );

  return (
    <SampleContext.Provider value={value}>{children}</SampleContext.Provider>
  );
}

export {SampleContext, SampleProvider};
