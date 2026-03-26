import React from "react";

import {Box, Divider, Theme, useMediaQuery, useTheme} from "@mui/material";
import {SxProps} from "@mui/material/styles";

import {Spinner} from "../../../shared/ui";
import {SampleReportDetails} from "../../../entities/sample/";

import {getBoxContainerProps, ReportDetailStyles} from "./ReportsDetailStyles";
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

  const {
    clients,
    analysisMethods,
    analytes,
    criterias,
    sampleTypes,
    isLoadingAll,
    getSampleTypeOptionsFromSamples,
  } = catalogs;

  const {
    form,
    isNotValidForm,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    handleAutoCompleteChange,
    getTextFieldHelperText,
  } = detailForm;

  const {
    isLoading,
    isLoadingSample,
    selectedReport,
    selectedSample,
    sideSectionTitle,
  } = state;

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
          form={form}
          analysisMethods={analysisMethods}
          analytes={analytes}
          criterias={criterias}
          formFieldsErrors={formFieldsErrors}
          getSampleTypeAutoCompleteOptionsFromSamples={
            getSampleTypeOptionsFromSamples
          }
          getTextFieldHelperText={getTextFieldHelperText}
          handleAutoCompleteChange={handleAutoCompleteChange}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
        />
      )}
      <Box sx={ReportDetailStyles.sampleDetailsContainer}>
        <SampleReportDetails
          sample={selectedSample}
          clients={clients || []}
          sampleTypes={sampleTypes || []}
          isLoadingSample={isLoadingSample}
        />
      </Box>
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
