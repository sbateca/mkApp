import {useEffect, useState} from "react";

import {Box} from "@mui/material";

import {TableRowProps} from "../../molecules/TableRow/Types";
import {Button, Spinner, Table, Typography} from "../../../shared/ui";
import {SideSection} from "../../../shared/ui/SideSection";
import {ReportDetail} from "../ReportsDetail";
import {reportsToTableRows} from "../../../adapters/tableRow";
import {
  REPORTS_TITLE_CONFIG,
  REPORTS_TABLE_HEADER_LABELS,
  REPORT_CREATE_BUTTON_LABEL,
  CREATE_REPORT_TITLE_TEXT,
} from "../../../utils/constants";
import {ReportsContentStyles} from "./ReportsContentStyles";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
  SnackBarSeverity,
} from "../../../utils/enums";
import {useSampleStore} from "../../../features/samples/model/store";
import {selectSamples} from "../../../features/samples/model/selectors";
import {useSampleTypeStore} from "../../../features/sampleType/model/store";
import {
  selectGetSampleTypes,
  selectSamplesTypes,
  selectSetSampleTypes,
} from "../../../features/sampleType/model/selectors";
import {useReportStore} from "../../../features/reports/model/store";
import {
  selectError,
  selectGetReports,
  selectIsLoadingReport,
  selectReports,
  selectSetReports,
  selectSetSelectedReport,
} from "../../../features/reports/model/selector";
import {useAnalyteStore} from "../../../features/analyte/model/store";
import {
  selectAnalytes,
  selectGetAnalytes,
  selectSetAnalytes,
} from "../../../features/analyte/model/selectors";
import {
  selectIsSideSectionOpen,
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
} from "../../../features/sideSection/model/selectors";
import {useSideSectionStore} from "../../../features/sideSection/model/store";
import {useSnackBarStore} from "../../../features/snackbar/model/store";
import {selectShowSnackBarMessage} from "../../../features/snackbar/model/selectors";

export const ReportsContent = (): React.ReactElement => {
  const [rows, setRows] = useState<TableRowProps[]>([]);
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(true);

  const reports = useReportStore(selectReports);
  const getReports = useReportStore(selectGetReports);
  const setReports = useReportStore(selectSetReports);
  const setSelectedReport = useReportStore(selectSetSelectedReport);
  const isLoading = useReportStore(selectIsLoadingReport);
  const error = useReportStore(selectError);

  const sampleTypes = useSampleTypeStore(selectSamplesTypes);
  const getSampleTypes = useSampleTypeStore(selectGetSampleTypes);
  const setSampleTypes = useSampleTypeStore(selectSetSampleTypes);

  const samples = useSampleStore(selectSamples);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const isSideSectionOpen = useSideSectionStore(selectIsSideSectionOpen);
  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);

  const analytes = useAnalyteStore(selectAnalytes);
  const getAnalytes = useAnalyteStore(selectGetAnalytes);
  const setAnalytes = useAnalyteStore(selectSetAnalytes);

  const handleOpenSideSection = () => {
    setSelectedReport(null);
    setIsReadOnlyMode(false);
    setSideSectionTitle(CREATE_REPORT_TITLE_TEXT);
    setIsSideSectionOpen(true);
  };

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
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR, getReports);
    }
  }, [error, getReports, showSnackBarMessage]);

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

  if (error) return <Typography text={error} variant="h6" />;

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={ReportsContentStyles.titleContentContainer}>
        <Typography {...REPORTS_TITLE_CONFIG} />
        <Box sx={ReportsContentStyles.titleContentActions}>
          <Button
            label={REPORT_CREATE_BUTTON_LABEL}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            icon={SharedButtonIcons.CREATE}
            onClick={handleOpenSideSection}
          />
        </Box>
      </Box>
      <Table headerLabels={REPORTS_TABLE_HEADER_LABELS} rows={rows} />
      <SideSection isOpen={isSideSectionOpen}>
        <ReportDetail
          isReadOnlyMode={isReadOnlyMode}
          setIsReadOnlyMode={setIsReadOnlyMode}
        />
      </SideSection>
    </Box>
  );
};
