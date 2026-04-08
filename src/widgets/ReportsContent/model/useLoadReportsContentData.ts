import {useEffect, useState} from "react";
import {TableRowProps} from "../../../components/molecules/TableRow/Types";
import {
  reportsToTableRows,
  selectGetReports,
  selectIsLoadingReport,
  selectReports,
  selectSetReports,
  useReportStore,
} from "../../../entities/report";
import {
  selectGetSampleTypes,
  selectSamplesTypes,
  selectSetSampleTypes,
  useSampleTypeStore,
} from "../../../entities/sampleType";
import {selectSamples, useSampleStore} from "../../../entities/sample";
import {useAnalyteStore} from "../../../features/analyte/model/store";
import {
  selectAnalytes,
  selectGetAnalytes,
  selectSetAnalytes,
} from "../../../features/analyte/model/selectors";

export const useLoadRepostsContentData = () => {
  const [rows, setRows] = useState<TableRowProps[]>([]);

  const reports = useReportStore(selectReports);
  const getReports = useReportStore(selectGetReports);
  const setReports = useReportStore(selectSetReports);

  const isLoading = useReportStore(selectIsLoadingReport);

  const sampleTypes = useSampleTypeStore(selectSamplesTypes);
  const getSampleTypes = useSampleTypeStore(selectGetSampleTypes);
  const setSampleTypes = useSampleTypeStore(selectSetSampleTypes);

  const samples = useSampleStore(selectSamples);

  const analytes = useAnalyteStore(selectAnalytes);
  const getAnalytes = useAnalyteStore(selectGetAnalytes);
  const setAnalytes = useAnalyteStore(selectSetAnalytes);

  useEffect(() => {
    const getSamplTypes = async () => {
      const sampleTypes = await getSampleTypes();
      setSampleTypes(sampleTypes);
    };
    getSamplTypes();
  }, [getSampleTypes, setSampleTypes]);

  useEffect(() => {
    if (reports) {
      setRows(reportsToTableRows(reports, samples, sampleTypes, analytes));
    }
  }, [reports, analytes, sampleTypes, samples]);

  useEffect(() => {
    const getAllReports = async () => {
      const reports = await getReports();
      setReports(reports);
    };

    getAllReports();
  }, [getReports, setReports]);

  useEffect(() => {
    const getAllAnalytes = async () => {
      const analytes = await getAnalytes();
      setAnalytes(analytes);
    };

    getAllAnalytes();
  }, [getAnalytes, setAnalytes]);

  return {rows, isLoading};
};
