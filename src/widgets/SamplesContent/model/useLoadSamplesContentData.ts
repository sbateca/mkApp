import {useEffect, useState} from "react";
import {TableRowProps} from "../../../components/molecules/TableRow/Types";
import {
  samplesToTableRows,
  selectGetSamples,
  selectIsLoading,
  selectSamples,
  useSampleStore,
} from "../../../entities/sample";
import {
  selectClients,
  selectGetClients,
  useClientStore,
} from "../../../entities/client";
import {
  selectGetSampleTypes,
  selectSamplesTypes,
  selectSetSampleTypes,
  useSampleTypeStore,
} from "../../../entities/sampleType";

export const useLoadSamplesContentData = () => {
  const [rows, setRows] = useState<TableRowProps[]>([]);

  const samples = useSampleStore(selectSamples);
  const isLoading = useSampleStore(selectIsLoading);

  const getSamples = useSampleStore(selectGetSamples);

  const clients = useClientStore(selectClients);
  const getClients = useClientStore(selectGetClients);

  const sampleTypes = useSampleTypeStore(selectSamplesTypes);
  const getSampleTypes = useSampleTypeStore(selectGetSampleTypes);
  const setSampleTypes = useSampleTypeStore(selectSetSampleTypes);

  useEffect(() => {
    getClients();
  }, [getClients]);

  useEffect(() => {
    getSamples();
  }, [getSamples]);

  useEffect(() => {
    const getAllSampleTypes = async () => {
      const sampleTypes = await getSampleTypes();
      setSampleTypes(sampleTypes);
    };

    getAllSampleTypes();
  }, [getSampleTypes, setSampleTypes]);

  useEffect(() => {
    if (samples) {
      setRows(samplesToTableRows(samples, sampleTypes, clients));
    }
  }, [samples, clients, sampleTypes]);

  return {rows, isLoading};
};
