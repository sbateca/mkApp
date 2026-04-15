import {useEffect, useState} from "react";
import {
  reportsToTableRows,
  selectGetReports,
  selectIsLoadingReport,
  selectReports,
  useReportStore,
} from "../../../entities/report";
import {
  selectGetSampleTypes,
  selectSamplesTypes,
  useSampleTypeStore,
} from "../../../entities/sampleType";
import {
  selectGetSamples,
  selectSamples,
  useSampleStore,
} from "../../../entities/sample";
import {useAnalyteStore} from "../../../entities/analyte/model/store";
import {
  selectAnalytes,
  selectGetAnalytes,
} from "../../../entities/analyte/model/selectors";
import {TableRowProps} from "../../../shared/ui/Table/TableRow";

export const useLoadRepostsContentData = () => {
  const [rows, setRows] = useState<TableRowProps[]>([]);

  const reports = useReportStore(selectReports);
  const getReports = useReportStore(selectGetReports);
  const isLoading = useReportStore(selectIsLoadingReport);

  const sampleTypes = useSampleTypeStore(selectSamplesTypes);
  const getSampleTypes = useSampleTypeStore(selectGetSampleTypes);

  const samples = useSampleStore(selectSamples);
  const getSamples = useSampleStore(selectGetSamples);

  const analytes = useAnalyteStore(selectAnalytes);
  const getAnalytes = useAnalyteStore(selectGetAnalytes);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        getReports(),
        getSampleTypes(),
        getSamples(),
        getAnalytes(),
      ]);
    };

    loadData();
  }, [getAnalytes, getReports, getSampleTypes, getSamples]);

  useEffect(() => {
    if (!reports) {
      setRows([]);
      return;
    }

    setRows(reportsToTableRows(reports, samples, sampleTypes, analytes));
  }, [reports, samples, sampleTypes, analytes]);

  return {rows, isLoading};
};
