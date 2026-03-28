import {useEffect} from "react";
import {
  selectClients,
  selectIsLoadingClient,
  useClientStore,
} from "../../../../entities/client";
import {selectIsLoading, useSampleStore} from "../../../../entities/sample";
import {
  selectGetSampleTypes,
  selectIsLoadingSampleTypes,
  selectSamplesTypes,
  selectSetSampleTypes,
  useSampleTypeStore,
} from "../../../../entities/sampleType";

export const useLoadSampleDetailData = () => {
  const isLoading = useSampleStore(selectIsLoading);

  const clients = useClientStore(selectClients);
  const isLoadingClients = useClientStore(selectIsLoadingClient);

  const sampleTypes = useSampleTypeStore(selectSamplesTypes);
  const isLoadingSampleTypes = useSampleTypeStore(selectIsLoadingSampleTypes);
  const getSampleTypes = useSampleTypeStore(selectGetSampleTypes);
  const setSampleTypes = useSampleTypeStore(selectSetSampleTypes);

  const isLoadingAll = isLoadingClients || isLoadingSampleTypes;

  useEffect(() => {
    const fetchSampleTypes = async () => {
      const sampleTypes = await getSampleTypes();
      setSampleTypes(sampleTypes);
    };
    fetchSampleTypes();
  }, [getSampleTypes, setSampleTypes]);

  return {
    clients,
    isLoading,
    isLoadingAll,
    sampleTypes,
  };
};
