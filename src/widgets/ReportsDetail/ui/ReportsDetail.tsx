import {useWorkspacePermissions} from "../../../entities/auth/model/workspacePermissions";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";
import React from "react";
import {
  Box,
  Divider,
  SxProps,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  selectError,
  selectIsLoadingReport,
  selectSelectedReport,
  useReportStore,
} from "../../../entities/report";
import {useReadOnlyMode} from "../../../features/readOnlyMode";
import {useSideSection} from "../../../features/sideSection";
import {getBoxContainerProps} from "../../../shared/commonStyles";
import {Spinner} from "../../../shared/ui";
import {useReportDetailController} from "../model/useReportDetailController";
import {useReportErrorNotifier} from "../model/useReportErrorNotifier";
import {ReportDetailHeader} from "./ReportDetailHeader";
import {ReportDetailForm} from "./ReportDetailForm";
import {ReportReadView} from "./ReportReadView";

type EditorProps = {isLessThanMediumScreen: boolean};

const ReportEditor = ({isLessThanMediumScreen}: EditorProps) => {
  const {catalogs, detailForm, state, actions} = useReportDetailController();

  return catalogs.isLoadingAll ? (
    <Spinner />
  ) : (
    <ReportDetailForm
      isLessThanMediumScreen={isLessThanMediumScreen}
      catalogs={catalogs}
      detailForm={detailForm}
      state={state}
      actions={actions}
    />
  );
};

export const ReportDetail = ({
  canCreate,
}: {
  canCreate: boolean;
}): React.ReactElement => {
  const {can} = useWorkspacePermissions();
  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const selectedReport = useReportStore(selectSelectedReport);
  const isLoading = useReportStore(selectIsLoadingReport);
  const error = useReportStore(selectError);
  const {sideSectionTitle, onCloseSideSection} = useSideSection();
  const {isReadOnlyMode} = useReadOnlyMode();
  useReportErrorNotifier(error);

  const canEdit = selectedReport
    ? can(BaseRoutes.REPORTS, "update") &&
      selectedReport.actions?.update?.allowed === true
    : canCreate;
  const showEditor = canEdit && !isReadOnlyMode;

  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <ReportDetailHeader
        handleCloseSideSection={onCloseSideSection}
        isLoading={isLoading}
        isReadOnlyMode={!showEditor}
        selectedReport={selectedReport}
        sideSectionTitle={sideSectionTitle}
      />
      <Divider />
      {showEditor ? (
        <ReportEditor isLessThanMediumScreen={isLessThanMediumScreen} />
      ) : selectedReport ? (
        <ReportReadView
          report={selectedReport}
          isLessThanMediumScreen={isLessThanMediumScreen}
        />
      ) : null}
    </Box>
  );
};
