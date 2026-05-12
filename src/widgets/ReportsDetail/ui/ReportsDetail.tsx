import React from "react";

import {Box, Divider, Theme, useMediaQuery, useTheme} from "@mui/material";
import {SxProps} from "@mui/material/styles";

import {Spinner} from "../../../shared/ui";

import {getBoxContainerProps} from "./ReportsDetailStyles";
import {ReportDetailProps} from "./Types";
import {ReportSideSectionButtons} from "./ReportsSideSectionButtons";
import {useReportDetailController} from "../model/useReportDetailController";
import {ReportDetailHeader} from "./ReportDetailHeader";
import {ReportDetailForm} from "./ReportDetailForm";

export const ReportDetail = ({
  isReadOnlyMode,
  setIsReadOnlyMode,
}: ReportDetailProps): React.ReactElement => {
  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {catalogs, detailForm, state, actions} = useReportDetailController({
    setIsReadOnlyMode,
  });

  const {isLoadingAll} = catalogs;
  const {isNotValidForm} = detailForm;
  const {isLoading, selectedReport, sideSectionTitle} = state;
  const {onCloseSideSection, onCreateReport, onEditReport} = actions;

  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <ReportDetailHeader
        isReadOnlyMode={isReadOnlyMode}
        handleCloseSideSection={onCloseSideSection}
        isLoading={isLoading}
        selectedReport={selectedReport}
        sideSectionTitle={sideSectionTitle}
      />
      <Divider />
      {isLoadingAll ? (
        <Spinner />
      ) : (
        <ReportDetailForm
          isLessThanMediumScreen={isLessThanMediumScreen}
          isReadOnlyMode={isReadOnlyMode}
          catalogs={catalogs}
          detailForm={detailForm}
          state={state}
        />
      )}
      <Box
        sx={{
          display: "flex",
          alignSelf: "flex-end",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <ReportSideSectionButtons
          isNotValidForm={isNotValidForm}
          report={selectedReport}
          isReadOnlyMode={isReadOnlyMode}
          setIsReadOnlyMode={setIsReadOnlyMode}
          handleCreateReport={onCreateReport}
          handleEdit={onEditReport}
        />
      </Box>
    </Box>
  );
};
