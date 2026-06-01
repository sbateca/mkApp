import React from "react";

import {Box, Divider, Theme, useMediaQuery, useTheme} from "@mui/material";
import {SxProps} from "@mui/material/styles";

import {Spinner} from "../../../shared/ui";

import {useReportDetailController} from "../model/useReportDetailController";
import {ReportDetailHeader} from "./ReportDetailHeader";
import {ReportDetailForm} from "./ReportDetailForm";
import {getBoxContainerProps} from "../../../shared/commonStyles";

export const ReportDetail = (): React.ReactElement => {
  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {catalogs, detailForm, state, actions} = useReportDetailController();

  const {isLoadingAll} = catalogs;
  const {isLoading, selectedReport, sideSectionTitle} = state;
  const {onCloseSideSection} = actions;

  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <ReportDetailHeader
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
          catalogs={catalogs}
          detailForm={detailForm}
          state={state}
          actions={actions}
        />
      )}
    </Box>
  );
};
