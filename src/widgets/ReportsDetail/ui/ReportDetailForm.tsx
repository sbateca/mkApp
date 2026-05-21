import React from "react";
import {Box, Stack, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import {
  getSideSectionButtonsProps,
  getStackContainerProps,
  getStackFieldProps,
  getStackRowProps,
  SampleFormStyles,
} from "./ReportsDetailStyles";
import {
  ANALYSIS_TITLE,
  DATEPICKER_VIEWS,
  FORM_TITLES,
  getFormStringValue,
  REPORT_DATE_LABEL_TEXT,
  REPORT_NUMBER_LABEL_TEXT,
  REPORT_SAMPLE_LABEL_TEXT,
} from "../../../utils/constants";
import {
  ReportFormFields,
  SelectVariants,
  SharedButtonColors,
  SharedButtonSizes,
  SharedTextFieldVariants,
} from "../../../utils/enums";
import {AutoComplete} from "../../../shared/ui";
import {SampleReportDetails} from "../../../entities/sample";
import {ReportTestForm} from "./ReportTestForm";
import {ReportSideSectionButtons} from "./ReportsSideSectionButtons";
import {DetailFormProps} from "../model/types";

export const ReportDetailForm = ({
  isLessThanMediumScreen,
  isReadOnlyMode,
  setIsReadOnlyMode,
  catalogs,
  detailForm,
  state,
  actions,
}: DetailFormProps): React.ReactElement => {
  const {
    analysisMethods,
    clients,
    criterias,
    sampleTypes,
    sampleTypeOptionsFromSamples,
  } = catalogs;

  const {
    form,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    handleAutoCompleteChange,
    getTextFieldHelperText,
    analytesByTestType,
    reportTestGroups,
    areReportTestsValid,
    hasCompleteReportTestRow,
    getReportTestRows,
    handleTestRowsChange,
  } = detailForm;

  const {isLoadingSample, selectedReport, selectedSample} = state;
  const {onCreateReport, onEditReport, onApproveReport, onDownloadReport} =
    actions;
  const reportDate = getFormStringValue(form, ReportFormFields.REPORT_DATE);
  return (
    <>
      <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <Stack {...getStackFieldProps()}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={SampleFormStyles.datePicker}
                disableFuture
                views={DATEPICKER_VIEWS}
                label={REPORT_DATE_LABEL_TEXT}
                name={ReportFormFields.REPORT_DATE}
                onChange={(value) =>
                  handleDateChange(value, ReportFormFields.REPORT_DATE)
                }
                slotProps={{
                  textField: {
                    error: !!formFieldsErrors[ReportFormFields.REPORT_DATE],
                    helperText: getTextFieldHelperText(
                      ReportFormFields.REPORT_DATE,
                    ),
                    variant: SharedTextFieldVariants.STANDARD,
                  },
                }}
                value={reportDate ? dayjs(reportDate) : null}
                readOnly={isReadOnlyMode}
              />
            </LocalizationProvider>
          </Stack>

          <Stack {...getStackFieldProps()}>
            <TextField
              required
              error={!!formFieldsErrors[ReportFormFields.REPORT_NUMBER]}
              label={REPORT_NUMBER_LABEL_TEXT}
              type="string"
              color={SharedButtonColors.PRIMARY}
              size={SharedButtonSizes.SMALL}
              onChange={handleChange}
              name={ReportFormFields.REPORT_NUMBER}
              helperText={getTextFieldHelperText(
                ReportFormFields.REPORT_NUMBER,
              )}
              value={form[ReportFormFields.REPORT_NUMBER] ?? ""}
              variant={SharedTextFieldVariants.STANDARD}
              fullWidth
              InputProps={{
                readOnly: isReadOnlyMode,
              }}
            />
          </Stack>

          <Stack {...getStackFieldProps()}>
            <AutoComplete
              options={sampleTypeOptionsFromSamples}
              label={REPORT_SAMPLE_LABEL_TEXT}
              value={`${form[ReportFormFields.SAMPLE_ID] ?? ""}`}
              variant={SelectVariants.STANDARD}
              onChange={handleAutoCompleteChange}
              name={ReportFormFields.SAMPLE_ID}
              readOnly={isReadOnlyMode}
              required
              error={!!formFieldsErrors[ReportFormFields.SAMPLE_ID]}
              helperText={getTextFieldHelperText(ReportFormFields.SAMPLE_ID)}
            />
          </Stack>
        </Stack>

        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <Box {...getStackFieldProps()}>
            <SampleReportDetails
              sample={selectedSample}
              clients={clients || []}
              sampleTypes={sampleTypes || []}
              isLoadingSample={isLoadingSample}
            />
          </Box>
        </Stack>

        {Object.entries(analytesByTestType).map(
          ([testTypeId, analytes], index) => {
            return (
              <Stack
                key={testTypeId}
                {...getStackRowProps(isLessThanMediumScreen)}
              >
                <ReportTestForm
                  isReadonly={isReadOnlyMode}
                  analytes={analytes}
                  criterias={criterias}
                  analysisMethods={analysisMethods}
                  hasCompleteReportTestRow={hasCompleteReportTestRow}
                  title={FORM_TITLES[index] ?? `${ANALYSIS_TITLE} ${index + 1}`}
                  rows={getReportTestRows(testTypeId)}
                  onRowsChange={(nextRows) =>
                    handleTestRowsChange(testTypeId, nextRows)
                  }
                />
              </Stack>
            );
          },
        )}
      </Stack>
      <Box {...getSideSectionButtonsProps()}>
        <ReportSideSectionButtons
          isNotValidForm={detailForm.isNotValidForm || !areReportTestsValid}
          report={selectedReport}
          isReadOnlyMode={isReadOnlyMode}
          setIsReadOnlyMode={setIsReadOnlyMode}
          handleCreateReport={() => onCreateReport(reportTestGroups)}
          handleEdit={() => onEditReport(reportTestGroups)}
          handleApprove={() => onApproveReport(selectedReport?.id || "")}
          handleDownload={() => onDownloadReport(selectedReport?.id || "")}
        />
      </Box>
    </>
  );
};
