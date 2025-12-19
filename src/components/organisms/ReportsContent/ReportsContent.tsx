import {useEffect, useState} from "react";

import {Box} from "@mui/material";

import {TableRowProps} from "../../molecules/TableRow/Types";
import {Button, Spinner, Typography} from "../../atoms";
import {Table} from "../Table";
import {SideSection} from "../SideSection";
import {ReportDetail} from "../ReportsDetail";
import {reportsToTableRows} from "../../../adapters/tableRow";
import {
  useAnalyte,
  useSampleType,
  useSample,
  useSideSection,
  useReports,
} from "../../../utils/hooks";
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
import useSnackBarStore from "../../../stores/snackBarStore";

export const ReportsContent = (): React.ReactElement => {
  const [rows, setRows] = useState<TableRowProps[]>([]);
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(true);

  const {reports, getReports, setSelectedReport, isLoading, error} =
    useReports();
  const {sampleTypes} = useSampleType();
  const {samples} = useSample();
  const {showSnackBarMessage} = useSnackBarStore();
  const {isSideSectionOpen, setIsSideSectionOpen, setSideSectionTitle} =
    useSideSection();
  const {analytes} = useAnalyte();

  const handleOpenSideSection = () => {
    setSelectedReport(null);
    setIsReadOnlyMode(false);
    setSideSectionTitle(CREATE_REPORT_TITLE_TEXT);
    setIsSideSectionOpen(true);
  };

  useEffect(() => {
    if (reports) {
      setRows(reportsToTableRows(reports, samples, sampleTypes, analytes));
    }
  }, [reports, analytes]);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR, getReports);
    }
  }, [error]);

  if (isLoading) return <Spinner />;
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
