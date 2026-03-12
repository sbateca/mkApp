import {useEffect} from "react";

import {Box} from "@mui/material";
import Swal from "sweetalert2";

import {Button, Spinner} from "../../../shared/ui";
import {ReportTableActionButtonsProps} from "./Types";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
  SnackBarSeverity,
  SweetAlertIcon,
} from "../../../utils/enums";
import {
  REPORT_DELETE_CONFIRMATION_SUBTITLE,
  REPORT_DELETE_CONFIRMATION_TITLE,
  REPORT_DETAILS_TITLE_TEXT,
  REPORT_DELETE_CONFIRMATION_TEXT,
  SAMPLE_SUCCESSFULLY_DELETED_TEXT,
} from "../../../utils/constants";
import {useReportStore} from "../../../features/reports/model/store";
import {
  selectDeleteReport,
  selectError,
  selectGetReportById,
  selectGetReports,
  selectIsLoadingReport,
  selectSetSelectedReport,
} from "../../../features/reports/model/selector";
import {useSideSectionStore} from "../../../features/sideSection/model/store";
import {
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
} from "../../../features/sideSection/model/selectors";
import {useSnackBarStore} from "../../../features/snackbar/model/store";
import {selectShowSnackBarMessage} from "../../../features/snackbar/model/selectors";

export const ReportTableActionButtons = ({
  reportId,
}: ReportTableActionButtonsProps): React.ReactElement => {
  const isLoading = useReportStore(selectIsLoadingReport);
  const error = useReportStore(selectError);
  const deleteReport = useReportStore(selectDeleteReport);
  const getReportById = useReportStore(selectGetReportById);
  const getReports = useReportStore(selectGetReports);
  const setSelectedReport = useReportStore(selectSetSelectedReport);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);

  const handleOpenSideSection = async (reportId: string) => {
    const report = await getReportById(reportId);
    if (report) {
      setSelectedReport(report);
      setSideSectionTitle(REPORT_DETAILS_TITLE_TEXT);
      setIsSideSectionOpen(true);
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: REPORT_DELETE_CONFIRMATION_TITLE,
      text: REPORT_DELETE_CONFIRMATION_SUBTITLE,
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d33",
      confirmButtonText: REPORT_DELETE_CONFIRMATION_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteReport(reportId);
        if (result !== null) {
          showSnackBarMessage(
            SAMPLE_SUCCESSFULLY_DELETED_TEXT,
            SnackBarSeverity.SUCCESS,
            getReports,
          );
        }
      }
    });
  };

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error, showSnackBarMessage]);

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Button
            icon={IconNames.SEARCH}
            label={SharedButtonCommonLabels.VIEW}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            onClick={() => handleOpenSideSection(reportId)}
          />
          <Button
            icon={IconNames.DELETE}
            label={SharedButtonCommonLabels.DELETE}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.ERROR}
            onClick={handleDelete}
          />
        </>
      )}
    </Box>
  );
};
