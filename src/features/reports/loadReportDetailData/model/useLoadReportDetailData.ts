import {useEffect} from "react";
import {
  selectAnalysisMethods,
  selectGetAnalysisMethods,
  selectIsLoadingAnalysisMethods,
  selectSetAnalysisMethods,
} from "../../../analysisMethods/model/selectors";
import {useAnalysisMethodsStore} from "../../../analysisMethods/model/store";
import {
  selectAnalytes,
  selectGetAnalytes,
  selectIsLoadingAnalytes,
  selectSetAnalytes,
} from "../../../analyte/model/selectors";
import {useAnalyteStore} from "../../../analyte/model/store";
import {
  selectClients,
  selectIsLoadingClient,
  useClientStore,
} from "../../../../entities/client";
import {
  selectCriterias,
  selectGetCriterias,
  selectIsLoadingCriterias,
  selectSetCriterias,
} from "../../../criteria/model/selector";
import {useCriteriaStore} from "../../../criteria/model/store";
import {selectSamples, useSampleStore} from "../../../../entities/sample";
import {
  selectGetSampleTypes,
  selectIsLoadingSampleTypes,
  selectSamplesTypes,
  selectSetSampleTypes,
} from "../../../../entities/sampleType/model/selectors";
import {useSampleTypeStore} from "../../../../entities/sampleType/model/store";
import {AutoCompleteOption} from "../../../../shared/ui/AutoComplete/types";

export const useLoadReportDetailData = () => {
  const clients = useClientStore(selectClients);
  const isLoadingClients = useClientStore(selectIsLoadingClient);

  const samples = useSampleStore(selectSamples);

  const sampleTypes = useSampleTypeStore(selectSamplesTypes);
  const getSampleTypes = useSampleTypeStore(selectGetSampleTypes);
  const isLoadingSampleTypes = useSampleTypeStore(selectIsLoadingSampleTypes);
  const setSampleTypes = useSampleTypeStore(selectSetSampleTypes);

  const analysisMethods = useAnalysisMethodsStore(selectAnalysisMethods);
  const getAnalysisMethods = useAnalysisMethodsStore(selectGetAnalysisMethods);
  const setAnalysisMethods = useAnalysisMethodsStore(selectSetAnalysisMethods);
  const isLoadingAnalysisMethods = useAnalysisMethodsStore(
    selectIsLoadingAnalysisMethods,
  );

  const analytes = useAnalyteStore(selectAnalytes);
  const isLoadingAnalytes = useAnalyteStore(selectIsLoadingAnalytes);
  const getAnalytes = useAnalyteStore(selectGetAnalytes);
  const setAnalytes = useAnalyteStore(selectSetAnalytes);

  const criterias = useCriteriaStore(selectCriterias);
  const isLoadingCriterias = useCriteriaStore(selectIsLoadingCriterias);
  const getCriterias = useCriteriaStore(selectGetCriterias);
  const setCriterias = useCriteriaStore(selectSetCriterias);

  const isLoadingAll =
    isLoadingClients ||
    isLoadingSampleTypes ||
    isLoadingAnalysisMethods ||
    isLoadingAnalytes ||
    isLoadingCriterias;

  useEffect(() => {
    const getAllSampleTypes = async () => {
      const sampleTypes = await getSampleTypes();
      setSampleTypes(sampleTypes);
    };
    getAllSampleTypes();
  }, [getSampleTypes, setSampleTypes]);

  useEffect(() => {
    const getAllCriterias = async () => {
      const criterias = await getCriterias();
      setCriterias(criterias);
    };
    getAllCriterias();
  }, [getCriterias, setCriterias]);

  useEffect(() => {
    const getAllAnalysisMethods = async () => {
      const analysisMethods = await getAnalysisMethods();
      setAnalysisMethods(analysisMethods);
    };

    getAllAnalysisMethods();
  }, [getAnalysisMethods, setAnalysisMethods]);

  useEffect(() => {
    const getAllAnalytes = async () => {
      const analytes = await getAnalytes();
      setAnalytes(analytes);
    };

    getAllAnalytes();
  }, [getAnalytes, setAnalytes]);

  const getSampleTypeOptionsFromSamples = (): AutoCompleteOption[] => {
    return (
      samples?.map((sample) => {
        const sampleTypeFound = sampleTypes?.find(
          (sampleType) => sampleType.id === sample.sampleTypeId,
        );
        return {
          id: sample.id,
          optionLabel: `${sample.sampleCode} - ${sampleTypeFound?.name}`,
        };
      }) ?? []
    );
  };

  return {
    clients,
    analysisMethods,
    analytes,
    criterias,
    sampleTypes,
    isLoadingAll,
    getSampleTypeOptionsFromSamples,
  };
};
