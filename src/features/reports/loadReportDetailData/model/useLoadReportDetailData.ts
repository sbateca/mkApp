import {useEffect, useMemo} from "react";
import {
  selectAnalysisMethods,
  selectGetAnalysisMethods,
  selectIsLoadingAnalysisMethods,
  selectSetAnalysisMethods,
} from "../../../../entities/analysisMethod/model/selectors";
import {useAnalysisMethodsStore} from "../../../../entities/analysisMethod/model/store";
import {
  selectAnalytes,
  selectGetAnalytes,
  selectGetAnalytesByTestTypeId,
  selectIsLoadingAnalytes,
  selectSetAnalytes,
} from "../../../../entities/analyte/model/selectors";
import {useAnalyteStore} from "../../../../entities/analyte/model/store";
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
} from "../../../../entities/criteria/model/selector";
import {useCriteriaStore} from "../../../../entities/criteria/model/store";
import {
  selectGetSamples,
  selectSamples,
  selectSetSamples,
  useSampleStore,
} from "../../../../entities/sample";
import {
  selectGetSampleTypes,
  selectIsLoadingSampleTypes,
  selectSamplesTypes,
  selectSetSampleTypes,
} from "../../../../entities/sampleType/model/selectors";
import {useSampleTypeStore} from "../../../../entities/sampleType/model/store";
import {AutoCompleteOption} from "../../../../shared/ui/AutoComplete/types";
import {
  selectGetTestTypes,
  selectIsLoadingTestTypes,
  selectSetTestTypes,
  selectTestTypes,
  useTestTypeStore,
} from "../../../../entities/testType";
import {
  useTestStore,
  selectTests,
  selectGetTests,
  selectIsLoadingTests,
  selectSetTests,
} from "../../../../entities/test";

export const useLoadReportDetailData = () => {
  const clients = useClientStore(selectClients);
  const isLoadingClients = useClientStore(selectIsLoadingClient);

  const samples = useSampleStore(selectSamples);
  const getSamples = useSampleStore(selectGetSamples);
  const setSamples = useSampleStore(selectSetSamples);

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
  const getAnalytesByTestTypeId = useAnalyteStore(
    selectGetAnalytesByTestTypeId,
  );

  const criterias = useCriteriaStore(selectCriterias);
  const isLoadingCriterias = useCriteriaStore(selectIsLoadingCriterias);
  const getCriterias = useCriteriaStore(selectGetCriterias);
  const setCriterias = useCriteriaStore(selectSetCriterias);

  const testTypes = useTestTypeStore(selectTestTypes);
  const getTestTypes = useTestTypeStore(selectGetTestTypes);
  const setTestTypes = useTestTypeStore(selectSetTestTypes);
  const isLoadingTestTypes = useTestTypeStore(selectIsLoadingTestTypes);

  const tests = useTestStore(selectTests);
  const getTests = useTestStore(selectGetTests);
  const setTests = useTestStore(selectSetTests);
  const isLoadingTests = useTestStore(selectIsLoadingTests);

  const isLoadingAll =
    isLoadingClients ||
    isLoadingSampleTypes ||
    isLoadingAnalysisMethods ||
    isLoadingAnalytes ||
    isLoadingCriterias ||
    isLoadingTestTypes ||
    isLoadingTests;

  useEffect(() => {
    const retrieveAllReportDetailData = async () => {
      const [
        sampleTypes,
        criterias,
        analysisMethods,
        analytes,
        tests,
        testTypes,
        samples,
      ] = await Promise.all([
        getSampleTypes(),
        getCriterias(),
        getAnalysisMethods(),
        getAnalytes(),
        getTests(),
        getTestTypes(),
        getSamples(),
      ]);
      setSampleTypes(sampleTypes);
      setCriterias(criterias);
      setAnalysisMethods(analysisMethods);
      setAnalytes(analytes);
      setTests(tests);
      setTestTypes(testTypes);
      setSamples(samples);
    };
    retrieveAllReportDetailData();
  }, [
    getTests,
    getSampleTypes,
    getCriterias,
    getAnalysisMethods,
    getAnalytes,
    getTestTypes,
    setTests,
    setSampleTypes,
    setCriterias,
    setAnalysisMethods,
    setAnalytes,
    setSamples,
    getSamples,
    setTestTypes,
  ]);

  const sampleTypeOptionsFromSamples = useMemo<AutoCompleteOption[]>(() => {
    return (
      samples?.map((sample) => {
        const sampleTypeFound = sampleTypes?.find(
          (sampleType) => sampleType.id === sample.sampleType.id,
        );

        return {
          id: `${sample.id}`,
          optionLabel: `${sample.sampleCode} - ${sampleTypeFound?.name ?? ""}`,
        };
      }) ?? []
    );
  }, [samples, sampleTypes]);

  const getTestTypeOptions = (): AutoCompleteOption[] => {
    return (
      testTypes?.map((testType) => {
        return {
          id: testType.id,
          optionLabel: testType.name,
        };
      }) ?? []
    );
  };

  const getTestOptions = (): AutoCompleteOption[] => {
    return (
      tests?.map((test) => {
        return {
          id: test.id,
          optionLabel: test.analyte.name,
        };
      }) ?? []
    );
  };

  const getAnalysisMethodOptions = (): AutoCompleteOption[] => {
    return (
      analysisMethods?.map((analysisMethod) => {
        return {
          id: analysisMethod.id,
          optionLabel: analysisMethod.name,
        };
      }) ?? []
    );
  };

  const getCriteriaOptions = (): AutoCompleteOption[] => {
    return (
      criterias?.map((criteria) => {
        return {
          id: criteria.id,
          optionLabel: criteria.name,
        };
      }) ?? []
    );
  };

  return {
    clients,
    analysisMethods,
    analytes,
    criterias,
    samples,
    sampleTypes,
    tests,
    testTypes,
    isLoadingAll,
    sampleTypeOptionsFromSamples,
    getTestTypeOptions,
    getTestOptions,
    getAnalysisMethodOptions,
    getCriteriaOptions,
    getAnalytesByTestTypeId,
  };
};
